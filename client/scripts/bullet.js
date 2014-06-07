(function(global){

    function Bullet(options){
        options = options || {};

        this.bulletType = options.bulletType||"single";
        this.render();
    }

    Bullet.prototype = {
        render: function(){
            this.element = dom(".bullet");
            this.element.addClass(this.bulletType);
            return this.element;
        },
        show: function(){
            this.element.addClass("active");
        },
        hide: function(){
            this.element.removeClass("active");
        },
        runBulletAnimation: function(startPoint, endPoint, finalAnimation, callback){
            var angle = this.calculateBulletAngle(startPoint, endPoint), time,
                that = this;

            this.rotate(angle);
            this.setPosition(startPoint);
            this.show();
            time = mathPoint.getLength()(startPoint, endPoint) / settings.cellSide * settings.oneCellTime;

            this.move(endPoint, time); // we can also use on animation end instead of timeout
            setTimeout(function(){
                this.element.addClass(finalAnimation);
                setTimeout(function(){
                    that.hide();
                    callback && callback();
                }, 1000); // TODO: we should use on animation end instead of timeout
            }, time);

        },
        calculateBulletAngle: function(startPoint, endPoint){
            return mathPoint.getAngle(startPoint, endPoint);
        }

    }

    augment(Bullet, Movable);

    global.Bullet = Bullet;

})(window);