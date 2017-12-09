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
	var timeline = document.getElementById("timeline").value;

	cordovaHTTP.get(url + '?initials=' + initials + '&condition=' + condition + 
		'&timeline=' + timeline + '&trial_count=INITIALIZE&atime=INITIALIZE' +
		'&ptime=INITIALIZE&diff=INITIALIZE&acondition=&sscore= &ascore= ', {}, {}, function(response) {});

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
	
	if (isNaN(perceived_time)) { // check if number entered
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
		var difference = perceived_time - actual_time;

		// add to google spreadsheet
		cordovaHTTP.get(url + '?initials=&condition=&timeline=&' + 
			'trial_count=' + trial_count + '&atime=' + actual_time + 
			'&ptime=' + perceived_time + '&diff=' + difference + 
			'&acondition=&sscore=&ascore=', {}, {}, function(response) {});

		trial_count++;
		
		if (time_list.length == 0) // if 30 trials are done
		{
			alert("You finished 30 trials for this block.");
			cordovaHTTP.get(url + '?initials=DONE&condition=DONE&timeline=DONE' + 
			'&trial_count=DONE&atime=DONE&ptime=DONE&acondition=&sscore=&ascore=',
		{}, {}, function(response) {});
		}

		// updates trial number
		document.getElementById("count").innerHTML = "Trial: " + trial_count + "/30";
	}
}


