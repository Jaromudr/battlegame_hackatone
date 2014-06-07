(function(global){
    
    function Game(options){
        options = options || {};
        
//        this.playersCount = options.PlayersCount || 2;
        this.playersArray = [];
        this.movePlayer = undefined;
        this.moveTimestamp = undefined;
        this.moveTimer = options.moveTimer || 20;
        this.moveType = options.moveType || "choice";   // choice|cycle|random
        this.board = undefined;
    }
    
    Game.prototype = {
        setBoard: function(board){
            this.board=board;
            if(board===undefined){
                board.assignGame(this);
            }
        },
        addPlayer: function(player){
            player.game=this;
            this.playersArray.push(player);
//            if(player.game===undefined){
////                player.setGame(this);
//            }
        },
        start: function(){
            
        }
    };
    
    global.Game=Game;
})(window);