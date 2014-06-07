(function(global){

    var moveDiffPoints = {
        "right": new Point(1, 0),
        "left": new Point(-1, 0),
        "up": new Point(0, -1),
        "down": new Point(0, 1),
    }

    function Ship(options){
        options = options || {};

        this.shipType = options.shipType||"single";
        this.direction = options.direction||"right";
        this.fullHealth = options.fullHealth||100;
        this.health = this.fullHealth;
        this.speed = options.speed||3;
        this.side = options.side||1;
        this.size = new Point(this.side, this.side);
        this.visibleFarness = options.visibleFarness||1;
        this.currentPosition = options.currentPosition||new Point(0, 0);
        
        this.player=undefined;

        this.render();
    }

    Ship.prototype = {
        render: function(){
            this.element = dom(".ship");
            this.element.addClass(this.shipType);
            this.element.addClass(this.direction);
            return this.element;
        },
        move: function(direction){
            var diff;
            if(this.direction!==direction){
                this.element.removeClass(this.direction);
                this.direction = direction;
                this.element.addClass(direction);
            }

            this.currentPosition.add(moveDiffPoints[direction]);
            this.runMoveAnimation();
        },
        runMoveAnimation: function(){
            // calculate real position and move from current point to that point
        },
        getVisibleRectangle: function(){
            var visibleSide = this.side + 2 * this.visibleFarness;
            return new Rectangle(
                this.currentPosition.sub(new Point(-this.visibleFarness, --this.visibleFarness)),
                this.currentPosition.add(new Point(visibleSide, visibleSide))
            );
        },
        getRectangle: function(){
            return new Rectangle(
                this.currentPosition,
                this.currentPosition.add(this.size)
            )
        },
        catchPoint: function(point){
            return this.getRectangle().includePoint(point);
        },
        setPlayer: function(player){
            this.player=player;
            player.shipsArray.push(this);
        }
    };

    global.Ship = Ship;

})(window);