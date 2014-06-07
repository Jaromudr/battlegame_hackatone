(function(global){

    window.addEventListener('load',function(){
        global.app = new App();
        app.renderLoginPage();
    },false);

})(window);