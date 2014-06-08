(function(global){
    var shipTypes = {
        singleShip: function(direction){
            return new Ship({
                shipType: "single",
                direction: direction||"left"
            })
        },
        secondSingleShip: function(direction){
            return new Ship({
                shipType: "second",
                direction: direction||"left"
            })
        },
        thirdSingleShip: function(direction){
            return new Ship({
                shipType: "single3",
                speed: 4,
                health: 30,
                direction: direction||"left"
            });
        },
        bigShip: function(direction){
            return new Ship({
                shipType: "big1",
                side: 2,
                speed: 2,
                health: 150,
                direction: direction||"left"
            });
        }
    }

    global.shipTypes = shipTypes;

})(window);