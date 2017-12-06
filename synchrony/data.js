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

	// clearButton(2);
	// start one minute countdown timer
	countDown();
}

// Purpose: to alert users that activity is over; collect any remaining data at 
//          the end of the experiment
function done()
{
	alert("You are done! You will find out your team score at the end of the experiment.");
	// save and report points somehow
	// cordovaHTTP get request?
	// ****TODO**** PUT TEXT ON THE SCREEN instead of ALERT

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

		// sneakily displace overall countdown and interval time on screen
		document.getElementById("countdown").innerHTML = distance;
		document.getElementById("interval").innerHTML = ms_count;

		// each user's button appear for 500 alternatively (70 translates to 500ms)
		// if (ms_count == 70) { // participant visible
		// 	clearButton(1);
		// 	display(2); // happens 68 times		
		// 	count++;
		// } 
	 //    if (ms_count == 140) { // experimenter visible
		// 	display(1);
		// 	clearButton(2);
		// 	ms_count = 0;
		// }
		if (ms_count == 50) {
			clearButton(1);
			clearButton(2);
		}
		if (ms_count == 100) {
			display(1);
			display(2);
			ms_count = 0;
		}
		// TO DO - try to enable the participant's button

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
	if (user == 1) document.getElementById("participant").style.visibility = "visible";
	else document.getElementById("experimenter").style.visibility = "visible";
}

// Purpose: to make a button on the screen invisible given the user type
//   (1: participant, 2: experimenter)
function clearButton(user)
{
	if (user == 1) document.getElementById("participant").style.visibility = "hidden";
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
function triggerE()
{
	console.log("E hit");
	var time = document.getElementById("interval").innerHTML;
	return (time - 80);
}