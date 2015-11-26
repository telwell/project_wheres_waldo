var Waldo = Waldo || {}

Waldo.Timer = (function(){

	function init(){
		var seconds = parseInt($('#seconds').html());
		var minutes = parseInt($('#minutes').html());
		var hours = parseInt($('#hours').html());
		timer(hours, minutes, seconds);
	}

	function add(hours, minutes, seconds) {
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}


		$('#timer').html( (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) );

		_saveTimeToSession(hours, minutes, seconds);

		timer(hours, minutes, seconds);
	}

	function timer(hours, minutes, seconds) {
		t = setTimeout(function(){add(hours, minutes, seconds)}, 1000);
	}

	function _saveTimeToSession(hours, minutes, seconds){
		$.ajax( {
			url: "/save_time.json",
			type: "POST",
			data: {
				seconds: seconds, 
				minutes: minutes, 
				hours: hours
			},
			dataType: "json",
			success: function( json ) {
				console.log("Time Saved");
			},
			error: function( xhr, status, errorThrown ) {
				console.log(errorThrown);
			}
		});
	}

	return{
		init: init
	}

})()