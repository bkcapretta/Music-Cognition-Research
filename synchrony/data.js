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

	countDown();
}

// Purpose: to begin the simulation of practicing the experiment
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
	// print out done message on screen
	var link = document.createElement('a');
	link.textContent = 'You are done! Click here to rate the activity. You will find out your team score at the end of the experiment.';
	link.href = 'rate.html';
	document.getElementById("countdown").appendChild(link);
	
	clearButton("P"); // clear buttons from screen (aesthetic choice)
	clearButton("E");
}

// Purpose: to track 40 seconds of time during the experiment; make buttons
//		blink for 300ms every 600ms
function countDown()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 40000); // 40 seconds
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// get ms_count on screen so triggerP can grab time (if needed - may not be)
		document.getElementById("interval").innerHTML = ms_count;

		// buttons appear for 300ms every 600ms
		if (ms_count == 60) {  // the ms_count for some reason doesn't exactly
			clearButton("P");  // translate to the actual number of milliseconds
			clearButton("E");  // going by
		}
		if (ms_count == 120) { 
			display("P");
			display("E");
			ms_count = 0; // reset count so the pattern continues
		}
		ms_count++; 
		
		if (distance < 0) { // if countdown is finished, display to screen
			clearInterval(x);
			done();
		}
	}, 1); // update interval every millisecond
}

// Purpose: to simulate the experiment for the participant lasting 10 seconds
function practiceCountDown()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 10000); // 10 seconds
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// buttons appear for 300ms every 600ms
		if (ms_count == 60) {
			clearButton("P");
		}
		if (ms_count == 120) {
			display("P");
			ms_count = 0;
		}
		ms_count++;
		
		// if count down is finished, alert user
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("countdown").innerHTML = "DONE PRACTICING! Click above to move forward";
			clearButton("P");
			clearButton("E");
		}
	}, 1); 
}

// Purpose: to display the appropriate button given user type
//     ("P" - participant, "E" - experimenter)
function display(user)
{
	if (user == "P") document.getElementById("participant").style.visibility = "visible";
	else document.getElementById("experimenter").style.visibility = "visible";
}

// Purpose: to make a button on the screen invisible given the user type
//   ("P" - participant, "E" - experimenter)
function clearButton(user)
{
	if (user == "P") document.getElementById("participant").style.visibility = "hidden";
	else document.getElementById("experimenter").style.visibility = "hidden";
}

function rate()
{
	var scale = document.getElementById("rate").value;

	if (isNaN(scale) || (scale > 5) || (scale < 1)) { // check if number entered
		alert("Must input a number between 1 and 5");
	}
	else {
		// report to sheet that experiment is done - send any info that might be useful
		cordovaHTTP.get(url + '?initials=&condition=SYNC&timeline=SYNC' +
			'&trial_count=SYNC&atime=SYNC&ptime=SYNC&diff=SYNC&poff=SYNC&acondition=Synchrony' +
			'&sscore=' + scale + '&ascore=&poss_points=&success=', {}, {}, function(response) {});

		document.getElementById("done").innerHTML = "You are done with the activity.";
	}

}

// These functions would've been helpful had the tablet been able to process 
// two clicks at the same time

// Purpose: to return how far off the participant was from clicking the button
//     against when it appeared (visible from 0-80)
// function triggerP()
// {
// 	console.log("P hit");
// 	// the lower the number, the closer they clicked it to being seen
// 	// the higher the number, a slower response time
// 	return document.getElementById("interval").innerHTML;
// }

// Purpose: to return how far off the experimenter was from clicking the button
//     against when it appeared (visible from 80-160)
// function triggerE()
// {
// 	console.log("E hit");
// 	var time = document.getElementById("interval").innerHTML;
// 	return (time - 80);
// }
