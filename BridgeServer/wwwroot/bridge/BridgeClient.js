/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.3.1
 */
Bridge.assembly("BridgeClient", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgeClient.App", {
        main: function Main () {
            document.body.appendChild(BridgeClient.App.Container);
            document.body.onscroll = Bridge.fn.combine(document.body.onscroll, BridgeClient.App.OnScroll);
            BridgeClient.App.OnScroll(null);
        },
        statics: {
            props: {
                Container: null,
                LastUserId: 0
            },
            ctors: {
                init: function () {
                    this.Container = function (_o1) {
                            _o1.classList.add("ui");
                            _o1.classList.add("segment");
                            _o1.classList.add("link");
                            _o1.classList.add("cards");
                            return _o1;
                        }(document.createElement("div"));
                }
            },
            methods: {
                OnScroll: function (event) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        lastChild, 
                        users, 
                        $t, 
                        user, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4], $step);
                                switch ($step) {
                                    case 0: {
                                        document.body.onscroll = Bridge.fn.remove(document.body.onscroll, BridgeClient.App.OnScroll);

                                        lastChild = System.Linq.Enumerable.from(BridgeClient.App.Container.children).lastOrDefault(null, null);
                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if ( lastChild == null || lastChild.offsetTop <= window.pageYOffset + window.innerHeight * 1.5 ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $task1 = BridgeClient.App.GetNextUsers();
                                        $step = 3;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        users = $taskResult1;

                                        $t = Bridge.getEnumerator(users);
                                        try {
                                            while ($t.moveNext()) {
                                                user = $t.Current;
                                                BridgeClient.App.Container.appendChild(BridgeClient.App.CreateCard(user));
                                            }
                                        } finally {
                                            if (Bridge.is($t, System.IDisposable)) {
                                                $t.System$IDisposable$dispose();
                                            }
                                        }
                                        lastChild = System.Linq.Enumerable.from(BridgeClient.App.Container.children).lastOrDefault(null, null);

                                        $step = 1;
                                        continue;
                                    }
                                    case 4: {
                                        document.body.onscroll = Bridge.fn.combine(document.body.onscroll, BridgeClient.App.OnScroll);
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                },
                CreateCard: function (user) {
                    var $t;
                    var card = ($t = document.createElement("div"), $t.className = "card", $t.onclick = function (e) {
                        window.location.href = user.html_url;
                    }, $t);

                    var image = ($t = document.createElement("div"), $t.className = "image", $t);
                    image.appendChild(($t = new Image(), $t.src = user.avatar_url, $t));

                    var content = ($t = document.createElement("div"), $t.className = "content", $t);
                    content.appendChild(($t = document.createElement("div"), $t.className = "header", $t.textContent = user.login, $t));

                    card.appendChild(image);
                    card.appendChild(content);

                    return card;
                },
                GetNextUsers: function () {
                    var tcs = new System.Threading.Tasks.TaskCompletionSource();
                    var req = new XMLHttpRequest();
                    req.responseType = "json";
                    req.open("GET", "https://api.github.com/users?since=" + BridgeClient.App.LastUserId);
                    req.onloadend = Bridge.fn.combine(req.onloadend, function (e) {
                        var users = Bridge.cast(req.response, System.Array.type(BridgeServer.DTO.GitHubUser));
                        BridgeClient.App.LastUserId = (BridgeClient.App.LastUserId + users.length) | 0;
                        tcs.setResult(users);
                    });
                    req.send();
                    return tcs.task;
                }
            }
        }
    });

    Bridge.define("BridgeServer.DTO.GitHubUser", {
        props: {
            login: null,
            avatar_url: null,
            html_url: null
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VDbGllbnQuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQW1CWUEsMEJBQTBCQTtZQUMxQkEsbUVBQTBCQTtZQUMxQkEsMEJBQVNBOzs7Ozs7Ozs7cUNBcUV3REEsQUFBbURBLFVBQUNBOzRCQUFPQTs0QkFBd0JBOzRCQUE2QkE7NEJBQTBCQTs0QkFBMkJBLE9BQU9BOzBCQUE5SUE7Ozs7b0NBbEVoRUE7Ozs7Ozs7Ozs7Ozs7O3dDQUUvQkEsa0VBQTBCQTs7d0NBRTFCQSxZQUFnQkEsNEJBQXVFQTt3Q0FDdkZBOzs7Ozs2Q0FBT0EsYUFBYUEsUUFBUUEsdUJBQXVCQSxxQkFBcUJBOzs7Ozs7Ozt3Q0FFcEVBLFNBQWtCQTs7Ozs7OztnREFBTkE7O3dDQUVaQSwwQkFBcUJBOzs7O2dEQUVqQkEsdUNBQXNCQSw0QkFBV0E7Ozs7Ozs7d0NBR3JDQSxZQUFZQSw0QkFBdUVBOzs7Ozs7d0NBR3ZGQSxtRUFBMEJBOzs7Ozs7Ozs7Ozs7c0NBTVVBOztvQkFFcENBLFdBQVdBLHlFQUdrQkE7d0JBQUtBLHVCQUF1QkE7OztvQkFHekRBLFlBQVlBO29CQUNaQSxrQkFBa0JBLDRCQUErQkE7O29CQUVqREEsY0FBY0E7b0JBQ2RBLG9CQUFvQkEsK0VBR3NCQTs7b0JBRzFDQSxpQkFBaUJBO29CQUNqQkEsaUJBQWlCQTs7b0JBRWpCQSxPQUFPQTs7O29CQU9QQSxVQUFVQSxJQUFJQTtvQkFDZEEsVUFBVUEsSUFBSUE7b0JBQ2RBLG1CQUFtQkE7b0JBQ25CQSxnQkFBZ0JBLHdDQUF3Q0E7b0JBQ3hEQSxpREFBaUJBO3dCQUVUQSxZQUFZQSxZQUFjQTt3QkFDMUJBLDZEQUFjQTt3QkFDZEEsY0FBY0E7O29CQUV0QkE7b0JBQ0FBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG51c2luZyBCcmlkZ2VTZXJ2ZXIuRFRPO1xyXG5cclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZUNsaWVudFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChDb250YWluZXIpO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5Lk9uU2Nyb2xsICs9IE9uU2Nyb2xsO1xyXG4gICAgICAgICAgICBPblNjcm9sbChudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHZvaWQgT25TY3JvbGwoRXZlbnQ8SFRNTEJvZHlFbGVtZW50PiBAZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5Lk9uU2Nyb2xsIC09IE9uU2Nyb2xsO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxhc3RDaGlsZCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuTGFzdE9yRGVmYXVsdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4oQ29udGFpbmVyLkNoaWxkcmVuKTtcclxuICAgICAgICAgICAgd2hpbGUgKGxhc3RDaGlsZCA9PSBudWxsIHx8IGxhc3RDaGlsZC5PZmZzZXRUb3AgPD0gV2luZG93LlBhZ2VZT2Zmc2V0ICsgV2luZG93LklubmVySGVpZ2h0ICogMS41KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlcnMgPSBhd2FpdCBHZXROZXh0VXNlcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdXNlciBpbiB1c2VycylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDb250YWluZXIuQXBwZW5kQ2hpbGQoQ3JlYXRlQ2FyZCh1c2VyKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGFzdENoaWxkID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0T3JEZWZhdWx0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PihDb250YWluZXIuQ2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5Lk9uU2Nyb2xsICs9IE9uU2Nyb2xsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBIVE1MRGl2RWxlbWVudCBDb250YWluZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSFRNTERpdkVsZW1lbnQgQ3JlYXRlQ2FyZChHaXRIdWJVc2VyIHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2FyZCA9IG5ldyBIVE1MRGl2RWxlbWVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwiY2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT25DbGljayA9IGUgPT4gV2luZG93LkxvY2F0aW9uLkhyZWYgPSB1c2VyLmh0bWxfdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSFRNTERpdkVsZW1lbnQoKSB7IENsYXNzTmFtZSA9IFwiaW1hZ2VcIiB9O1xyXG4gICAgICAgICAgICBpbWFnZS5BcHBlbmRDaGlsZChuZXcgSFRNTEltYWdlRWxlbWVudCgpIHsgU3JjID0gdXNlci5hdmF0YXJfdXJsIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBuZXcgSFRNTERpdkVsZW1lbnQoKSB7IENsYXNzTmFtZSA9IFwiY29udGVudFwiIH07XHJcbiAgICAgICAgICAgIGNvbnRlbnQuQXBwZW5kQ2hpbGQobmV3IEhUTUxEaXZFbGVtZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJoZWFkZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb250ZW50ID0gdXNlci5sb2dpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNhcmQuQXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICBjYXJkLkFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNhcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBMYXN0VXNlcklkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUYXNrPEdpdEh1YlVzZXJbXT4gR2V0TmV4dFVzZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0Y3MgPSBuZXcgVGFza0NvbXBsZXRpb25Tb3VyY2U8R2l0SHViVXNlcltdPigpO1xyXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcS5SZXNwb25zZVR5cGUgPSBYTUxIdHRwUmVxdWVzdFJlc3BvbnNlVHlwZS5Kc29uO1xyXG4gICAgICAgICAgICByZXEuT3BlbihcIkdFVFwiLCBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnM/c2luY2U9XCIgKyBMYXN0VXNlcklkKTtcclxuICAgICAgICAgICAgcmVxLk9uTG9hZEVuZCArPSBlID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJzID0gKEdpdEh1YlVzZXJbXSlyZXEuUmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFVzZXJJZCArPSB1c2Vycy5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGNzLlNldFJlc3VsdCh1c2Vycyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXEuU2VuZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGNzLlRhc2s7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgc3RhdGljIEhUTUxEaXZFbGVtZW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Db250YWluZXI9ICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhUTUxEaXZFbGVtZW50KCksKF9vMSk9PntfbzEuQ2xhc3NMaXN0LkFkZChcInVpXCIpO19vMS5DbGFzc0xpc3QuQWRkKFwic2VnbWVudFwiKTtfbzEuQ2xhc3NMaXN0LkFkZChcImxpbmtcIik7X28xLkNsYXNzTGlzdC5BZGQoXCJjYXJkc1wiKTtyZXR1cm4gX28xO30pO31cclxufVxyXG4iXQp9Cg==
