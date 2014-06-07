(function(global){

    function Ship(options){
        options = options || {};

        this.shipType = options.shipType||"single";
        this.direction = options.direction||"right";
        this.fullHealth = options.fullHealth||100;
        this.health = this.fullHealth;
        this.speed = options.speed||3;
        this.side = options.side||1;
        this.visibleFarness = options.visibleFarness||1;
        this.currentPosition = options.currentPosition||new Point(0, 0);

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
            diff = new Point(
                (direction=="right")?1:((direction==="left")?-1:0),
                (direction=="up")?-1:((direction==="down")?1:0)
            );

            this.currentPosition.add(diff);
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
        }
    }

    global.Ship = Ship;

})(window);