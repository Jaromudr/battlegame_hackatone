(function(global){
    var app;

    function App(){
        app = this;
        this.appBody = document.getElementById("appBody");
    }

    App.prototype = {
    	clearBody: function(){
    		this.appBody.innerHTML = "";
    	},
        joinToGame: function(gameId, userId, opponentId){
            this.game = new Game(gameId, userId, opponentId);
            this.game.play();
        }
    }

    augment(App, Views);

    global.App = App;

})(window);