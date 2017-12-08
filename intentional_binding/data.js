// data.js
// Purpose: to make a sound phonate after a random amount of time and to record
//    that in the associated google spreadsheet

// TODO: Tone: 100ms, 1 kilohertz tone, not too loud, but clearly audible

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var actual_time = 0;
var time_list = [100, 100, 100, 100, 100, 100, 250, 250, 250, 250, 250, 250, 400, 400, 400, 400, 400, 400, 550, 550, 550, 550, 550, 550, 700, 700, 700, 700, 700, 700]; 
var trial_count = 1;

function initialize()
{
	time_list = [100, 100, 100, 100, 100, 100, 250, 250, 250, 250, 250, 250, 400, 400, 400, 400, 400, 400, 550, 550, 550, 550, 550, 550, 700, 700, 700, 700, 700, 700]; 
}

// Purpose: to collect the user's information
function collect()
{
	var initials = document.getElementById("initials").value;
	var condition = determine_condition();
	// var timeline

	cordovaHTTP.get(url + '?initials=' + initials + '&condition=' + condition + 
		'&timeline=INITIALIZE&trial_count=INITIALIZE&atime=INITIALIZE&ptime=INITIALIZE',
		{}, {}, function(response) {});

	//timeline = document.getElementById("timeline").value;
	console.log("Initials in collect: " + initials);
	console.log("Condition in collect: " + condition);

	document.getElementById("condition").innerHTML = "Condition assigned: " + condition;
}

// Purpose: to randomize whether the self or other is going first
// 		Self: 1
//		Other: 2
function determine_condition()
{
	var user = Math.floor((Math.random() * 2) + 1);
	if (user == 1) return "S";
	else return "O";
}

// Purpose: to pick a time randomly and make it sound after x milliseconds
function phonate()
{
	actual_time = time_list[Math.floor(Math.random()*time_list.length)];
	var sound = new Audio("http://www.soundjay.com/button/beep-07.wav"); 
	
	// wait some random amount of time
	setTimeout(function() {
		sound.play();
	}, actual_time);
}

function practice_record()
{
	var perceived_time = document.getElementById("perceived_time").value;
	
	if (isNaN(perceived_time)) {
		alert("Must input number");
	}
	else {
		// clear previous input for next submission
		document.getElementById("perceived_time").value = "";

		trial_count++;
		
		if (trial_count == 4)
		{
			alert("You are ready for the experiment.");
			initialize();	
			trial_count = 1;
		}

		// adds trial number
		document.getElementById("count").innerHTML = "Trial: " + trial_count + "/3";
	}
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
		// testing
		console.log("Trial count: " + trial_count);
		console.log("Perceived time: " + perceived_time);
		console.log("Actual time: " + actual_time);

		// remove time from list
		var index = time_list.indexOf(actual_time);
		if (index > -1) {
    		time_list.splice(index, 1);
		}

		// clear previous input for next submission
		document.getElementById("perceived_time").value = "";

		// add to google spreadsheet
		cordovaHTTP.get(url + '?atime=' + actual_time + "&ptime=" + perceived_time 
			+ '&initials= ' + '&condition= ' + '&timeline= ' +
			'&trial=' + trial_count, {}, {}, function(response) {});

		trial_count++;
		console.log("List: " + time_list);
		
		if (time_list.length == 0)
		{
			alert("You finished 30 trials for this block.");
			initialize();	
			trial_count = 1;
			cordovaHTTP.get(url + '?atime=&ptime=&initials=&condition=&timeline=&trial=DONE', 
				{}, {}, function(response) {});
		}

		// adds trial number
		document.getElementById("count").innerHTML = "Trial: " + trial_count + "/30";
	}
}


