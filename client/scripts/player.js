(function(global){
    
    function Player(options){
        options = options || {};

        this.isHero = !!options.isHero;

        this.ships = [];
        this.shipsMaster();

        this.isHero && this.shipsMaster();
    }
    
    Player.prototype = {
        arrangeShipsOnBoard: function(board){
            this.ships.forEach(function(ship){
                var x = Math.ceil(Math.random()*board.baseAreaWidth),
                    y = Math.ceil(Math.random()*board.boardHeight);

                ship.setPosition(new Point(x, y));
                // TODO: check intersections

                board.putShip(ship);
            });
        },
        loadShipsFromServer: function(gameId, userId, callback){
            var that = this;
            api.callURL("loadUserShips", {
                gameId: gameId,
                userId: userId
            }, function(data){
                data.ships.forEach(function(shipConfig){
                    var ship = new Ship(shipConfig);
                    that.ships.push(ship);
                    board.putShip();
                });
            });

        },
        shipsMaster: function(){
            this.ships.push(shipTypes.singleShip());
            this.ships.push(shipTypes.secondSingleShip());
            this.ships.push(shipTypes.thirdSingleShip());
            this.ships.push(shipTypes.bigShip());
        },

    };
    
    global.Player=Player;
})(window);