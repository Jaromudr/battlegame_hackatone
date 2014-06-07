(function(global){
    var app;

    function App(){
        app = this;
        this.appBody = document.getElementById("appBody");
    }

    App.prototype = {}

    // augment(App, AppViews);

    global.App = App;

})(window);