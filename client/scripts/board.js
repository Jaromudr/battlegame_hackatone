(function(global){
    
    function Board(options){
        options = options || {};
        
        this.boardWidth = options.boardWidth || 20;
        this.boardHeight = options.boardHeight || 20;
        
        this.shipsArray = [];
        
        this.game=undefined;
    }
    
    Board.prototype = {
        assignGame: function(game){
            this.game=game;
            if(game.board===undefined){
                game.setBoard(this);
            }
        }
    };
    
    global.Board=Board;
})(window);