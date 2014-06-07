(function(global){
    function Views(){} // interface

    Views.prototype = {
        renderLoginPage: function(){
            var that = this, element;

            app.clearBody();

            element = dom("div", [
                this.errorSpan = dom(".error"),
                this.nicknameInput =  dom("input", { placeholder: "superhero"}),
                this.signInButton = dom(".button", "Join")
            ]);

            app.appBody.appendChild(element);

            this.signInButton.addEventListener(function(e){
                api.callUrl("join", {
                    nickname: that.nicknameInput.value
                }, function(data){
                    app.gameId = data.gameId;

                    if(data.status == "started") {
                        app.joinToGame(gameId);
                    } else {
                        app.renderPendingPage();
                    }
                }, function(XMLHttpRequest, textStatus, errorThrown){
                    this.errorsArea.innerText = XMLHttpRequest.responseJSON.message;
                });
            });
        },
        renderPendingPage: function(){
            var element = dom("div", [
                dom("span", "waiting for partner...")
            ]);

            var interval = setInterval(function(){
                api.callUrl("gameStatus", {
                    gameId: app.gameId
                }, function(data){
                    if(data.status=="started") {
                        clearInterval(interval);
                        app.joinToGame(app.gameId);
                    }
                })
            }, 500);

            app.appBody.appendChild(element);
        }
    }

    global.Views = Views;

})(window);