// data.js
// Purpose: to make a sound phonate after a random amount of time and to record
//    that in the associated google spreadsheet

// TODO: Tone: 100ms, 1 kilohertz tone, not too loud, but clearly audible

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var actual_time = 0;
var time_list = [100, 250, 400, 550, 700]; 
Dictionary<int, int> time_table;
// TODO: make algorithm so that each time is evenly selected randomly
var trial_count = 1;
var initials = "";
var condition = "";
var timeline = "";

function initialize(time_table)
{
	time_table[100] = 0;
	time_table[250] = 0;
	time_table[400] = 0;
	time_table[550] = 0;
	time_table[700] = 0;
	trial_count = 1;
}

// Purpose: to collect the user's information
function collect()
{
	initials = document.getElementById("initials").value;
	condition = document.getElementById("condition").value;
	//timeline = document.getElementById("timeline").value;

	document.getElementById("entered").innerHTML = initials + " is ready for the experiment.";
	//window.location.href = "#experiment";
}

// Purpose: to pick a time randomly and make it sound after x milliseconds
function phonate()
{
	initialize();
	var randomized_time = evenly_random();
	var sound = new Audio("http://www.soundjay.com/button/beep-07.wav"); // tone_100ms.wav
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
	var user_info = window.location.search;
	console.log("User info: " + user_info);
	
	// TODO: make screen stay at the lower marker
	if (isNaN(perceived_time)) {
		alert("Must input number");
	}
	else {
		// testing
		console.log("Initial: " + initials);
		console.log("Condition: " + condition);
		console.log("Timeline: " + timeline);
		console.log("Trial count: " + trial_count);
		console.log("Perceived time: " + perceived_time);
		console.log("Actual time: " + actual_time)

		// clear previous input for next submission
		document.getElementById("perceived_time").value = "";

		// add to google spreadsheet
		cordovaHTTP.get(url + '?atime=' + actual_time + "&ptime=" + perceived_time 
			+ '&initials=' + initials + '&condition=' + condition + 
			'&timeline=' + timeline +'&trial=' + trial_count, {}, {}, function(response) {});
	
		// jump to experiment part of page
		//window.location.href = "#experiment";

		trial_count++;
		if (trial_count == 31)
		{
			alert("You finished 30 trials for this block.");
			initialize();	
		}

		// adds trial number
		document.getElementById("count").innerHTML = "Trial: " + trial_count + "/30";
	}
}

function evenly_random()
{
	var randomized_time = time_list[Math.floor(Math.random()*time_list.length)];
	
	while (time_table[randomized_time] == 6) {
		randomized_time = time_list[Math.floor(Math.random()*time_list.length)];
	}

	time_table[randomized_time]++;
	console.log("Random time:" + randomized_time);
	return randomized_time;
}


