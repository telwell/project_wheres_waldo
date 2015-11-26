$( document ).ready( function(){
	// Start your engines!
	if( $("body").data("controller") == 'waldo' && $("body").data("action") == 'show' ){
		Waldo.Tags.init();
		Waldo.Timer.init();
  }
});