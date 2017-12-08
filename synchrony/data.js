// data.js
// Purpose: to track how in sync the participant and experimenter are with
//		each other

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var count = 0;

// Purpose: to start the timer and have the experiment last one minute; have
//     the buttons alternate being displayed every 500ms
function start()
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);

	// start one minute countdown timer
	countDown();
}

function practiceStart() 
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);

	practiceCountDown();
}

// Purpose: to alert users that activity is over; collect any remaining data at 
//          the end of the experiment
function done()
{
	document.getElementById("interval").innerHTML = "You are done! You will find out your team score at the end of the experiment.";
	// save and report points somehow
	cordovaHTTP.get(url + '?acondition=Synchrony&sscore=in sync',
		{}, {}, function(response) {});
	
	clearButton("P");
	clearButton("E");
}

// Purpose: to track a minute of time during the experiment
function countDown()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 40000); // 40 seconds
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// sneakily displace overall countdown and interval time on screen
		// try without displaying to screen - realized it doesn't do anything...
		// still test!!
		// document.getElementById("countdown").innerHTML = distance;
		// document.getElementById("interval").innerHTML = ms_count;

		// buttons appear for 500ms and then off for 500ms
		if (ms_count == 50) {
			clearButton("P");
			clearButton("E");
		}
		if (ms_count == 100) {
			display("P");
			display("E");
			ms_count = 0;
		}
		ms_count++;
		
		if (distance < 0) { // if count down is finished, display to screen
			clearInterval(x);
			done();
		}
	}, 1); // update interval every millisecond
}

function practiceCountDown()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 10000); // 10 seconds
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// sneakily displace overall countdown and interval time on screen
		document.getElementById("countdown").innerHTML = distance;

		// buttons appear for 500ms and then off for 500ms
		if (ms_count == 50) {
			clearButton("P");
		}
		if (ms_count == 100) {
			display("P");
			ms_count = 0;
		}
		// TO DO - try to enable the participant's button
		ms_count++;
		
		// if count down is finished, alert user
		if (distance < 0) {
			clearInterval(x);
			alert("DONE PRACTICING! Click below to move forward")
		}
	}, 1); // update interval every millisecond
}

// Purpose: to display the appropriate button given user type
//     (1: participant, 2: experimenter)
function display(user)
{
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

// Purpose: to return how far off the participant was from clicking the button
//     against when it appeared (visible from 0-80)
function triggerP()
{
	console.log("P hit");
	// the lower the number, the closer they clicked it to being seen
	// the higher the number, a slower response time
	return document.getElementById("interval").innerHTML;
}

// Purpose: to return how far off the experimenter was from clicking the button
//     against when it appeared (visible from 80-160)
// function triggerE()
// {
// 	console.log("E hit");
// 	var time = document.getElementById("interval").innerHTML;
// 	return (time - 80);
// }
