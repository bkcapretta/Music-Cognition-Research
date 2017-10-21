// data.js
// Purpose: to make a sound phonate after a random amount of time and to record
//    that in the associated google spreadsheet

// TODO: Have user enter date, time of day (have automated in spreadsheet), 
//   want initials; have spreadsheet keep track of trial number; condition 
//   (self and observed)
// TODO: Tone: 100ms, 1 kilohertz tone, not too loud, but clearly audible

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var actual_time = 0;
var max = 900;
var min = 100; 

// Purpose: to pick a time randomly and make it sound after x milliseconds
function phonate()
{
	var randomized_time = [Math.floor(Math.random()*(max-min) + min)];
	var sound = new Audio('tone_100ms.wave');
	actual_time = randomized_time;

	// wait some random amount of time
	setTimeout(function() {
		sound.play();
	}, randomized_time);
}

// Purpose: given the assigned time, save user's perceived time and send
//     get request to save data in Google Sheets
function record()
{
	var perceived_time = document.getElementById("perceived_time").value;
	
	if (isNaN(perceived_time)) {
		alert("Must input number");
	}
	else {
		console.log("Perceived time: " + perceived_time);
		console.log("Actual time: " + actual_time)

		// clear previous input for next submission
		document.getElementById("perceived_time").value = "";

		// add to google spreadsheet
		cordovaHTTP.get(url + '?atime=' + actual_time + "&ptime=" + perceived_time,
											{}, {}, function(response) {});
	}
}
