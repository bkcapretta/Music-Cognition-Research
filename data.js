// data.js
// Purpose: to make a sound phonate after a random amount of time and to record
//    that in the associated google spreadsheet

// TODO: Tone: 100ms, 1 kilohertz tone, not too loud, but clearly audible

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var actual_time = 0;
var time_list = [100, 100, 250, 250, 400, 400, 550, 550, 700, 700]; 
var trial_count = 1;

function initialize()
{
	time_list = [100, 100, 250, 250, 400, 400, 550, 550, 700, 700];
}

// Purpose: to collect the user's information
function collect()
{
	var initials = document.getElementById("initials").value;
	var condition = document.getElementById("condition").value;
	// var timeline

	cordovaHTTP.get(url + '?atime=INITIALIZE&ptime=INITIALIZE&initials=' + initials + 
		'&condition=' + condition + '&timeline=INITIALIZE&trial=INITIALIZE', 
		{}, {}, function(response) {});

	//timeline = document.getElementById("timeline").value;
	console.log("Initials in collect: " + initials);
	console.log("Condition in collect: " + condition);
}

// Purpose: to pick a time randomly and make it sound after x milliseconds
function phonate()
{
	actual_time = time_list[Math.floor(Math.random()*time_list.length)];
	var sound = new Audio("http://www.soundjay.com/button/beep-07.wav"); // tone_100ms.wav

	var index = time_list.indexOf(actual_time);
	if (index > -1) {
    	time_list.splice(index, 1);
	}

	// wait some random amount of time
	setTimeout(function() {
		sound.play();
	}, actual_time);
}

function evenly_random()
{
	var randomized_time = time_list[Math.floor(Math.random()*time_list.length)];
	console.log("I'm in EVENLY_RANDOM()")
	var num_times = time_table["randomized_time"];

	while (num_times == 2) {
		console.log("This time (" + randomized_time + ") has been seen twice" +
			" before");
		randomized_time = time_list[Math.floor(Math.random()*time_list.length)];
		num_times = time_table["randomized_time"];
	}

	num_times++;
	time_table["randomized_time"] = num_times;

	return randomized_time;
}

// Purpose: given the assigned time, save user's perceived time and send
//     get request to save data in Google Sheets
function record()
{
	var perceived_time = document.getElementById("perceived_time").value;
	var user_info = window.location.search;
	
	// TODO: make screen stay at the lower marker
	if (isNaN(perceived_time)) {
		alert("Must input number");
	}
	else {
		// testing
		console.log("Trial count: " + trial_count);
		console.log("Perceived time: " + perceived_time);
		console.log("Actual time: " + actual_time)

		// clear previous input for next submission
		document.getElementById("perceived_time").value = "";

		// add to google spreadsheet
		cordovaHTTP.get(url + '?atime=' + actual_time + "&ptime=" + perceived_time 
			+ '&initials= ' + '&condition= ' + '&timeline= ' +
			'&trial=' + trial_count, {}, {}, function(response) {});

		trial_count++;
		
		if (trial_count == 11)
		{
			alert("You finished 10 trials for this block.");
			initialize();	
			trial_count = 1;
		}

		// adds trial number
		document.getElementById("count").innerHTML = "Trial: " + trial_count + "/10";
	}
}


