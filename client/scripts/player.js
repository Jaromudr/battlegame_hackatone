(function(global){
    
    function Player(options){
        options = options || {};
        
        this.shipsArray = [];
        this.game = undefined;
    }
    
    Player.prototype = {
//        setGame: function(game){
//            this.game=game;
//        }
    };
    
    global.Player=Player;
})(window);