// Let's namespace our Waldo JS under Waldo
var Waldo = Waldo || {}

Waldo.Tags = (function(){

	// Set some vars to use later
	var count = 0;
	var image_top = 200;
	var image_left = 15;

	// How forgiving do we want our game to be?
	var tolerance = 20;

	// Set the coordinates for where the characters are actually hidden.
	//  I've set everything to a fixed position so these coords should
	//  carry over on various screen sizes.
	var chars = [
		//waldo: 
			{x: 449, y: 696},
		//welda: 
			{x: 432, y: 472},
		//odlaw: 
			{x: 646, y: 489},
		//wizard: 
			{x: 836, y: 1041},
		//woof: 
			{x: 656, y: 832}
	];

	function init(){
		_config();
	}

// Private functions
	function _config(){
		$('#waldo-image').click(function(e){
			_createTag(e.pageX, e.pageY);
		})
	}

	function _createTag(x, y){
		$( 'body' ).append('<div class="photo-tag" data-x="'+ x +'" data-y="'+ y +'" data-count="'+ count +'"></div>');
		$( '.photo-tag[data-count="'+ count +'"]').css('top', y-25).css('left', x-25);
		var match = _checkMatch(y-25, x-25);
		_setTagColor(count, match)
		count++;
	}

	// See if our User has found one of the characters!
	function _checkMatch(x, y){
		var trigger = false;
		for(var i=0;i<chars.length;i++){
			if(chars[i].x + tolerance > x && chars[i].x - tolerance < x){
				if(chars[i].y + tolerance > y && chars[i].y - tolerance < y){
					trigger = true;
				}
			}
		}
		return trigger;
	}

	function _setTagColor(count, match){
		var tag = $('.photo-tag[data-count="'+ count +'"');
		match ? tag.css("border-color", "green") : tag.css("border-color", "red");
	}

	return{
		init: init
	}

})()