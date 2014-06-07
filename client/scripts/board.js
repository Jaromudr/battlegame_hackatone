(function(global){
    
    function Board(options){
        options = options || {};
        
        this.boardWidth = options.boardWidth || 20;
        this.boardHeight = options.boardHeight || 20;
        
        this.shipsArray = [];
        this.lightersArray = [];
        
        this.game=undefined;
    }
    
    Board.prototype = {
        assignGame: function(game){
            this.game=game;
            if(game.board===undefined){
                game.setBoard(this);
            }
        },
        render: function(){
            this.element = dom('.board');
            this.element.addClass('.board-width-'+this.boardWidth);
            this.element.addClass('.board-height-'+this.boardHeight);
            for(ship in this.shipsArray){
                ship.render();
            }
        }
    };
    
    global.Board=Board;
})(window);