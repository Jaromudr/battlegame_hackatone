(function(global){

    var moveDiffPoints = {
        "right": new Point(1, 0),
        "left": new Point(-1, 0),
        "up": new Point(0, -1),
        "down": new Point(0, 1)
    },
    rotateDirections = {
        "left": 0,
        "right": 180,
        "up": -90,
        "donw": 90
    }

    function Ship(options){
        options = options || {};

        this.shipType = options.shipType||"hunter";
        this.direction = options.direction||"right";
        this.fullHealth = options.fullHealth||100;
        this.health = this.fullHealth;
        this.armor = options.armor||0;
        this.damage = options.damage||1;
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
            this.element.addClass("ship-" + this.shipType);
            this.element.addClass("ship-red");

            this.element.style.height = settings.boardSide * this.side + "px";
            this.element.style.width = settings.boardSide * this.side + "px";
            return this.element;
        },
        setPosition: function(position){
            this.currentPosition = position;
            this.updateRealPosition();
        },
        moveShip: function(direction){
            var diff, angle;
            this.direction = direction;  

            angle = rotateDirections[direction];
            this.rotate(angle);

            this.currentPosition.add(moveDiffPoints[direction]);
            this.runMoveAnimation();

        },
        runMoveAnimation: function(){
            // calculate real position and move from current point to that point
            this.setTransition(400);
            this.updateRealPosition();
        },
        updateRealPosition: function(){
            this.realPosition = this.currentPosition.sub(new Point(-1, -1)).mult(settings.boardSide);
            this.move(this.realPosition, 400);
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
    augment(Ship, Movable);

    global.Ship = Ship;

})(window);