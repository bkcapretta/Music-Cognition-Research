// data.js
// Purpose: to catch when the participant and experimenter click their randomly 
//		appearing buttons on the respective sides of the screen for a minute

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var team_points = 0;

// Purpose: to start the timer and have the experimenter last one minute; have
//     the buttons randomly appear on either side of the screen
function start()
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);
	// prepare screen for activity
	clearButton("P");
	clearButton("E");
	countDown();
}

// Purpose: to collect any remaining data at the end of the experiment
function done()
{
	document.getElementById("interval").innerHTML = "You are done! You will find out your team score at the end of the experiment.";
	// save and report points somehow
	cordovaHTTP.get(url + '?acondition=Asynchrony&ascore=' + team_points,
		{}, {}, function(response) {});

	// function putOnSheet(initials,condition,timeline,trial_count,atime,ptime)
	// cordovaHTTP get request with team points before resetting
	team_points = 0;
	display("P");
	display("E");
}

// Purpose: to track a minute of time during the experiment
function countDown()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 40000);
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// sneakily displace result on screen
		// document.getElementById("countdown").innerHTML = distance;

		// make a random user's button appear for 400ms every 600ms
		if (ms_count == 50) {
			display("P");
			display("E");
		}
		if (ms_count == 100) {
			clearButton("P");
			clearButton("E");
			ms_count = 0;
		}
		ms_count++;
		
		if (distance < 0) { // if count down is finished, display to screen
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
	if (user == "P") document.getElementById("participant").style.visibility = "visible";
	else document.getElementById("experimenter").style.visibility = "visible";
}

// Purpose: to make a button on the screen invisible given the user type
//   (1: participant, 2: experimenter)
function clearButton(user)
{
	if (user == "P") document.getElementById("participant").style.visibility = "hidden";
	else document.getElementById("experimenter").style.visibility = "hidden";
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
	team_points++;
	console.log("Team points: " + team_points);
}

// Purpose: when the experimenter clicks their button, add a point to team_points
//		Keep track of how far off the experimenter was from seeing the button
//      appear and actually clicking it
function triggerE()
{
	team_points++;
	console.log("Team points: " + team_points);
}