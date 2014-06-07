(function(global){
    var shipTypes = {
        singleShip: function(direction){
            return new Ship({
                name: "single",
                direction: direction||"left"
            })
        },
        secondSingleShip: function(direction){
            return new Ship({
                name: "second",
                direction: direction||"left"
            })
        },
        thirdSingleShip: function(direction){
            return new Ship({
                name: "single3",
                speed: 4,
                health: 30,
                direction: direction||"left"
            });
        },
        bigShips: function(direction){
            return new Big({
                name: "big1",
                side: 2,
                speed: 2,
                health: 150,
                direction: direction||"left"
            });
        }
    }

    global.shipTypes = shipTypes;

})(window);