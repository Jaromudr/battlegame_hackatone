(function(global){
    
    function Game(gameId, userId, opponentId){
        this.gameId = gameId;
        this.userId = userId;

        this.board = new Board();
        this.player = new Player({ isHero: true });
        this.opponent = new Player();
        this.arrangeShips();
    }
    
    Game.prototype = {
        arrangeShips: function(){
            this.player.arrangeShipsOnBoard(this.board, function(shipsConfig){
                api.callUrl("saveShips", {
                    gameId: this.gameId,
                    userId: this.userId,
                    shipsConfig: JSON.stringify({ships: shipsConfig})
                }, function(data){
                    that.loadOpponentShips();
                });
            });
        },
        loadOpponentShips: function(){
            this.opponent.loadShipsFromServer(this.start.bind(this));;
        },
        start: function(){

        },
        checkStep: function(){
            api.callUrl("checkStep", {
                gameId: this.gameId,
                userId: this.userId
            }, function(data){
                if(data.status=="ok") {

                }

            });
        },
        currentPlayerStep: function(){
            var that = this;
            this.activePlayer.makeStep(function(results){
                if(this.isGameOver()){
                    that.gameOver();
                } else {
                    that.nextPlayerStep();
                }
            });
        },
        nextPlayerStep: function(){
            this.currentPlayerIndex++;

            if(this.currentPlayerIndex>=this.players.length) {
                this.currentPlayerIndex = 0;
            }

            this.activePlayer = this.players[this.currentPlayerIndex];
            this.currentPlayerStep();
        },
        gameOver: function(){
            
        }
    };
    
    global.Game=Game;
})(window);