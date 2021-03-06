(function(global){
    function Views(){} // interface

    Views.prototype = {
        renderLoginPage: function(){
            var that = this, element;

            app.clearBody();

            element = dom("div", [
                this.ship = dom('.page-login-ship'),
                this.h1 = dom('h1', '<img src="./img/Space-battle.png" alt="Space Battle" height="40" />'),
                this.errorSpan = dom(".error"),
                this.nicknameInput =  dom("input", { placeholder: "superhero"}),
                this.signInButton = dom("span.button", "Join")
            ]);

            element.addClass('page-login');

            app.appBody.appendChild(element);

            this.signInButton.addEventListener("click", function(e){
                api.callURL("join", {
                    nickname: that.nicknameInput.value
                }, function(data){
                    app.gameId = data.gameId;
                    app.userId = data.userId;

                    if(data.status == "started") {
                        app.joinToGame(app.gameId, data.opponentId, data.userId);
                    } else {
                        app.renderPendingPage();
                    }
                }, function(XMLHttpRequest, textStatus, errorThrown){
                    that.errorSpan.innerText = "User with such nick already online";
                });
            });
        },
        renderPendingPage: function(){
            app.clearBody();
            var element = dom("div.page-waiting", [
                dom('.anim-ufo-steals-cow'),
                dom("span.page-waiting-text", "Waiting for partner...")
            ]);

            var interval = setInterval(function(){
                api.callURL("gameStatus", {
                    gameId: app.gameId
                }, function(data){
                    if(data.status == "started") {
                        clearInterval(interval);

                        app.joinToGame(app.gameId, app.userId, (+data.userId==app.userId)?data.opponentId:dataUserId);
                    }
                })
            }, 500);

            app.appBody.appendChild(element);
        }
    }

    global.Views = Views;

})(window);