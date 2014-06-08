(function(global){

    function setContentHeight(){
        $("#appBody").css("height", $(window).height());
//
        settings.boardSide = Math.ceil(($(window).height() - 60)/settings.boardHeight);
//        settings.boardSide = Math.ceil(($(window).height() - 60)/settings.boardHeight);
//        settings.boardSide = $('.board-cell').width();
        $(".main-grid-wrapper").css("width", $(window).width() - $("#idea-store").width() -2 + "px");
//        $(".board-cell").css("width", settings.boardSide + "px");
//        $(".board-cell").css("height", (settings.boardSide-2) + "px");
//console.log(settings.boardSide);
    }

    window.addEventListener('load',function(){
        setContentHeight();
        global.app = new App();
        // app.renderLoginPage();
        app.joinToGame();
    },false);

})(window);