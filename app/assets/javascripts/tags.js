// Let's namespace our Waldo JS under Waldo
var Waldo = Waldo || {}

Waldo.Tags = (function(){

	// Set some vars to use later
	var tag_count = 0
	var hit_count = 0
	var image_top = 200
	var image_left = 15

	// How forgiving do we want our game to be?
	var tolerance = 15

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
		_showSavedTags();
	}

// Private functions
	function _config(){
		$('#waldo-image').click(function(e){
			_createTag(e.pageX, e.pageY, true);
		})
	}

	// QUESTION: I can't seem to pass a default paramater here. For instance, 
	// when I try to set save = true as the default I get yelled at by my code?
	function _createTag(x, y, save){
		$( 'body' ).append('<div class="photo-tag" data-x="'+ x +'" data-y="'+ y +'" data-count="'+ tag_count +'"></div>');
		$( '.photo-tag[data-count="'+ tag_count +'"]').css('top', y-25).css('left', x-25);
		var match = _checkMatch(y-25, x-25);
		_setTagColor(tag_count, match);
		if(save == true){
			// Don't save the tag again if we're rendering it from 
			// the session.
			_persistTag(y, x, match);
		}
		tag_count++;
		if(match == true){
			hit_count++
			// If we find all of the characters!
			if(hit_count == 5){
				_victory();
			}
		}
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

	function _setTagColor(tag_count, match){
		var tag = $('.photo-tag[data-count="'+ tag_count +'"');
		match ? tag.css("border-color", "green") : tag.css("border-color", "red");
	}

	function _persistTag(y, x, status){
		$.ajax( {
			url: "/tags.js",
			type: "POST",
			data: { 
				tag: { 
					x_coord: x, 
					y_coord: y, 
					status: status
				} 
			}, 
			dataType : "script",
			success: function( json ) {
				console.log("Tag Saved");
			},
			error: function( xhr, status, errorThrown ) {
				alert(errorThrown);
			}
		});
	}

	function _showSavedTags(){
		$.ajax( {
			url: "/show_all_tags.json",
			type: "POST",
			dataType: "json",
			success: function( json ) {
				console.log("Got Tags Successfully");
				$(json["tags"]).each(function(i, el){
					_createTag(el.x_coord, el.y_coord, false);
				});
			},
			error: function( xhr, status, errorThrown ) {
				alert(errorThrown);
			}
		});
	}

	function _victory(){
		$.ajax( {
			url: "/victory.js",
			type: "GET",
			dataType: "script",
			success: function( json ) {
				console.log("You've won alright!");
			},
			error: function( xhr, status, errorThrown ) {
				alert(errorThrown);
			}
		});
	}

	return{
		init: init
	}

})()