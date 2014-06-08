(function(global){
    var transformProperty = getStyleProperty('transform'),
        transitionProperty = getStyleProperty('transition');

    function Movable(){}; // Interface

    Movable.prototype = {
        setPosition: function(point){
            this.setTransition(time, 0);
            this.setTranslate(point);
        },
        move: function(point, time){
            this.setTransition(time);
            this.setTranslate(point);
        },
        setTransition: function(time){
            transitionProperty && (this.element.style[transitionProperty] = time + "ms");
        },
        setTranslate: function(point){
            var transform = this.element.style[transformProperty], 
                translateCss = ' translate3d(' + point.x + 'px,' + point.y + 'px, 0px)';
            if(!/translate3d\([^)]+\)/.test(transform)){
                transform += translateCss;
            } else {
                transform = transform.replace(/translate3d\([^)]+\)/, translateCss);
            }

            this.element.style[transformProperty] = transform;
        },
        rotate: function(angle){
            var transform = this.element.style[transformProperty], 
            translateCss = ' rotate(' + angle + 'deg)';

            if(!/rotate\([^)]+\)/.test(transform)){
                transform += translateCss;
            }else{
                transform = transform.replace(/rotate\([^)]+\)/, translateCss);
            }

            this.element.style[transformProperty] = transform;
        }

    }

    global.Movable = Movable;

})(window);