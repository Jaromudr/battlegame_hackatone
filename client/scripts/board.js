(function(global){
    
    function Board(options){
        options = options || {};
        
        this.boardWidth = options.boardWidth || 20;
        this.baseAreaWidth = options.baseAreaWidth || 5;
        this.boardHeight = options.boardHeight || 20;
        
        this.ships = [];
    }
    
    Board.prototype = {
        render: function(){
            this.element = dom(".board");
            return this.element;
        },
        putShip: function(ship){
            this.ships.push(ship);
            board.appendChild(ship.element);
        }

    };
    
    global.Board=Board;
})(window);