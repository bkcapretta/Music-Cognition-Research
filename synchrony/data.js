// data.js
// Purpose: to track how in sync the participant and experimenter are with
//		each other

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var users = [1, 2];

// Purpose: to start the timer and have the experimenter last one minute; have
//     the buttons randomly appear on either side of the screen
function start()
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);

	clearButton(1);
	clearButton(2);

	countDown();
}

// Purpose: to collect any remaining data at the end of the experiment
function done()
{
	// when time is up, collect team_points and anything else you might need
	alert("You are done! You will find out your team score at the end of the experiment.");
	// save and report points somehow
	// cordovaHTTP get request?

	team_points = 0;
	display(1);
	display(2);
}

// Purpose: to track a minute of time during the experiment
function countDown()
{
	var timerON = false;
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 60000);
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// sneakily displace result on screen
		document.getElementById("countdown").innerHTML = distance;

		// make a random user's button appear for 400ms every 600ms
		if (ms_count == 200) {
			//var user = users[Math.floor(Math.random()*users.length)];
			display(1);
			display(2);
		}
		if (ms_count == 600) {
			clearButton(1);
			clearButton(2);
			ms_count = 0;
		}
		// avoid making timing predictable
		ms_count++;
		
		// if count down is finished, alert user
		if (distance < 0) {
			clearInterval(x);
			done();
		}
	}, 1); // update interval every millisecond
}

// Purpose: to display the appropriate button given user type
//     (1: participant, 2: experimenter)
function display(user)
{
	// randomize which participant sees the button 
	// var user = Math.floor((Math.random() * 2) + 1);
	if (user == 1) {
		document.getElementById("participant").style.visibility = "visible";
	}
	else { 
		document.getElementById("experimenter").style.visibility = "visible";
	}
}

// Purpose: to make a button on the screen invisible given the user type
//   (1: participant, 2: experimenter)
function clearButton(user)
{
	if (user == 1) {
		document.getElementById("participant").style.visibility = "hidden";
	}
	else { 
		document.getElementById("experimenter").style.visibility = "hidden";
	}
}

// Purpose: to generate a random number that determines how long the user waits
//     to press a button (avg during the minute needs to be 600ms)
function randomize()
{
	// need a way to figure out a time for each button to randomly appear, but
	// make sure that over the entire minute, it averages out to be a 600ms wait
	var randomized_time = 600;

	return randomized_time;
}

// Purpose: when the participant clicks their button, add a point to team_points
//		Keep track of how far off the participant was from seeing the button
//      appear and actually clicking it
function triggerP()
{
	// given total time and time of the appeared button (+ total time in some way),
	// see how close the user is. 
	// Send data to another google spreadsheet

	
}

// Purpose: when the experimenter clicks their button, add a point to team_points
//		Keep track of how far off the experimenter was from seeing the button
//      appear and actually clicking it
function triggerE()
{
	// will be very similar to triggerP; how you store info will be different
	// though
	// send data to another google spreadsheet

}