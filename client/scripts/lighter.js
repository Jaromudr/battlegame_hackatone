(function(global){

    function Lighter(options){
        options = options || {};

        this.health = options.health || 2;  //decrease every turn until 0
        this.radius = options.radius || 1;
        this.currentPosition = options.currentPosition||new Point(0, 0);

        this.render();
    }

    Lighter.prototype = {
        render: function(){
        }
    };

    global.Lighter = Lighter;

})(window);