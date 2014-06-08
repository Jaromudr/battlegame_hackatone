(function(global){

	function setContentHeight(){
		$("#appBody").css("height", $(window).height());

		settings.boardSide = Math.ceil(($(window).height() - 60)/settings.boardHeight);
        $(".main-grid-wrapper").css("width", $(window).width() - $("#idea-store").width() -2 + "px");
	}

    window.addEventListener('load',function(){
    	setContentHeight();
        global.app = new App();
        // app.renderLoginPage();
        app.joinToGame();
    },false);

})(window);