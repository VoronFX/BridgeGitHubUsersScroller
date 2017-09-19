using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Bridge.Html5;
using Bridge.jQuery2;

using BridgeServer.DTO;

using Newtonsoft.Json;

namespace BridgeClient
{
    public class App
    {
        public static void Main()
        {
            Document.Body.AppendChild(Container);
            Document.Body.OnScroll += OnScroll;
            OnScroll(null);
        }

        private static async void OnScroll(Event<HTMLBodyElement> @event)
        {
            Document.Body.OnScroll -= OnScroll;

            var lastChild = Container.Children.LastOrDefault();
            while (lastChild == null || lastChild.OffsetTop <= Window.PageYOffset + Window.InnerHeight * 1.5)
            {
                var users = await GetNextUsers();

                foreach (var user in users)
                {
                    Container.AppendChild(CreateCard(user));
                }

                lastChild = Container.Children.LastOrDefault();
            }

            Document.Body.OnScroll += OnScroll;
        }

        public static HTMLDivElement Container { get; } =
            new HTMLDivElement() { ClassList = { "ui", "segment", "link", "cards" } };

        
        public static HTMLDivElement CreateCard(GitHubUser user)
        {
            var card = new HTMLDivElement()
                           {
                               ClassName = "card",
                               OnClick = e => Window.Location.Href = user.html_url
                           };

            var image = new HTMLDivElement() { ClassName = "image" };
            image.AppendChild(new HTMLImageElement() { Src = user.avatar_url });

            var content = new HTMLDivElement() { ClassName = "content" };
            content.AppendChild(new HTMLDivElement()
                                    {
                                        ClassName = "header",
                                        TextContent = user.login
                                    });

            card.AppendChild(image);
            card.AppendChild(content);

            return card;
        }

        public static int LastUserId { get; set; }

        public static Task<GitHubUser[]> GetNextUsers()
        {
            var tcs = new TaskCompletionSource<GitHubUser[]>();
            var req = new XMLHttpRequest();
            req.ResponseType = XMLHttpRequestResponseType.Json;
            req.Open("GET", "https://api.github.com/users?since=" + LastUserId);
            req.OnLoadEnd += e =>
                {
                    var users = (GitHubUser[])req.Response;
                    LastUserId += users.Length;
                    tcs.SetResult(users);
                };
            req.Send();
            return tcs.Task;
        }
    }
}
