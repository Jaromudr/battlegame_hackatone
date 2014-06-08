(function(global){

    window.addEventListener('load',function(){
        global.app = new App();
        app.renderPendingPage();
    },false);

})(window);