(function(global){
    var game;
    
    function Game(gameId, userId, opponentId){
        game = this;

        this.gameId = gameId;
        this.userId = userId;

        this.board = new Board();
        this.player = new Player({ isHero: true });
        this.opponent = new Player();
        // this.arrangeShips();
        this.arrangeShipsLocal();
    }
    
    Game.prototype = {
        render: function(){
            app.clearBody();
            
            tmp_elem=dom('div.board-grid');
            for(var i=0;i<this.board.boardHeight;++i){
                tmp_elem2=dom('div.board-row.board-row-'+i);
                for(var j=0;j<this.board.boardWidth;++j){
                    tmp_elem2.appendChild(dom('div.board-cell.board-cell-'+i+'-'+j));
                }
                tmp_elem.appendChild(tmp_elem2);
            }

            this.board.element.appendChild(tmp_elem);

            this.element = dom(".game-wrapper", [
                dom(".game-status"),
                this.board.element,
                dom(".game-tools")
            ]);

            app.appBody.appendChild(this.element);
            
//            settings.boardSide = $('.board-cell').width()+4;
            console.log(settings.boardSide);
        },
        play: function(){
            // this.gameLoop();
            this.render();
        },
        arrangeShipsLocal: function(){
            this.player.arrangeShipsOnBoard(this.board);
        },
        arrangeShips: function(){
            this.player.arrangeShipsOnBoard(this.board, function(shipsConfig){
                api.callUrl("saveUserShips", {
                    gameId: this.gameId,
                    userId: this.userId,
                    shipsConfig: JSON.stringify({ships: shipsConfig})
                }, function(data){
                    that.loadOpponentShips();
                });
            });
        },
        loadOpponentShips: function(){
            this.opponent.loadShipsFromServer(this.gameLoop.bind(this));;
        },
        gameLoop: function(){
            this.waitForMyStep(function(actions){
                game.playOpponentStep(actions, function(){
                    game.makeHeroStep(function(){
                        if(game.isOver) {
                            game.showGameOver();
                        } else {
                            game.gameLoop();
                        }
                    })
                });
            });
        },
        playOpponentStep: function(actions, callback){
            if(actions.length) {
                action.play(function(){
                    game.playOpponentStep(actions.slice(1));
                });
            } else {
                callback();
            }
        },
        waitForMyStep: function(callback){
            api.callURL("isMyStep", {
                gameId: this.gameId,
                userId: this.userId
            }, function(data){
                if(data.anwer=="yes") {
                    callback(data.actions)
                } else {
                    setTimeout(function(){
                        game.waitForMyStep(callback);
                    }, 500);
                }
            });
        },
        makeHeroStep: function(callback){
            this.player.makeSteps(function(actions){
                api.callURL("saveUserActions", {
                    actions: JSON.stringify(actions)
                }, function(){
                    callback();
                });
            });
        },
        showGameOver: function(){
            api.callURL("gameResults", {
                gameId: this.gameId
            }, function(data){
                if(+data.winnerId === this.userId) {
                    this.showVictory();
                } else {
                    this.showLoose();
                }
            })
        },
        showVictory: function(){
            var element = dom(".victory", [
                this.playAgainButton = dom(".button", "Play again")
            ]);

            app.appBody.appendChild(element);
            this.playAgainButton.addEventListener(click, app.playAgain.bind(this));
        },
        showLoose: function(){
            var element = dom(".loose", [
                this.playAgainButton = dom(".button", "Play again")
            ]);

            app.appBody.appendChild(element);
            this.playAgainButton.addEventListener(click, app.playAgain.bind(this));
        }
    };
    
    global.Game = Game;
})(window);