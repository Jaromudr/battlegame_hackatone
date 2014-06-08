(function(global){
    
    function Board(options){
        options = options || {};
        
        this.boardWidth = options.boardWidth || settings.boardWidth;
        this.baseAreaWidth = options.baseAreaWidth || settings.baseAreaWidth;
        this.boardHeight = options.boardHeight || settings.boardHeight;
        
        this.ships = [];
        this.render();
    }
    
    Board.prototype = {
        render: function(){
            this.element = dom(".board");

//            this.element.style.width = this.boardWidth * settings.boardSide + "px";
//            this.element.style.height = this.boardHeight * settings.boardSide + "px";

            return this.element;
        },
        putShip: function(ship){
            this.ships.push(ship);
            this.element.appendChild(ship.element);
        }

    };
    
    global.Board=Board;
})(window);