(function(global){
    var shipTypes = {
//        singleShip: function(direction){
//            return new Ship({
//                shipType: "single",
//                direction: direction||"left"
//            })
//        },
//        secondSingleShip: function(direction){
//            return new Ship({
//                shipType: "second",
//                direction: direction||"left"
//            })
//        },
//        thirdSingleShip: function(direction){
//            return new Ship({
//                shipType: "single3",
//                speed: 4,
//                health: 30,
//                direction: direction||"left"
//            });
//        },
//        bigShips: function(direction){
//            return new Big({
//                shipType: "big1",
//                side: 2,
//                speed: 2,
//                health: 150,
//                direction: direction||"left"
//            });
//        }
        shipHunter: function(direction){
            return new Ship({
                shipType: "hunter",
                speed: 7,
                damage: 1.2,
                armor: 0,
                fullHealth: 80,
                side: 2,
                visibleFarness: 4,
                direction: direction||"left"
            })
        },
        shipFalcon: function(direction){
            return new Ship({
                shipType: "falcon",
                speed: 3,
                damage: 1.1,
                armor: 30,
                fullHealth: 120,
                side: 3,
                visibleFarness: 3,
                direction: direction||"left"
            })
        },
        shipPython: function(direction){
            return new Ship({
                shipType: "python",
                speed: 5,
                damage: 1,
                armor: 10,
                fullHealth: 100,
                side: 2,
                visibleFarness: 2,
                direction: direction||"left"
            });
        },
    }

    global.shipTypes = shipTypes;

})(window);