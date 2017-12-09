// data.js
// Purpose: to catch when the participant and experimenter click their randomly 
//		appearing buttons on the respective sides of the screen for a minute

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var team_points = 0;
//var time_list = [338,410,483,746,748,570,446,661,611,723,760,777,365,502,801,660,675,395,374,850,304,579,473,807,638,659,450,322,841,535,717,760,827,804,657,813,732,422,545,435,668,765,670,754,875,887,784,610,723,613,494,595,353,800,393,598,508,619,499,670,574,351,306,478,575,404,422]
// average number is 120 which is ~600ms
var time_list = [171,75,131,92,116,66,120,64,66,169,123,136,143,94,73,104,160,171,180,172,136,129,128,96,63,124,152,159,111,136,85,101,77,127,148,100,141,67,176,129,67,73,82,119,159,177,115,151,139,99,64,165,99,138,176,106,101,172,74,89,74,148,141,128,75,179,120]

// Purpose: to start the timer and have the experimenter last one minute; have
//     the buttons randomly appear on either side of the screen
function start()
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);
	
	countDown();
}

// Purpose: to begin the simulation of practicing the activity
function practiceStart() 
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);

	practiceCountDown();
}

// Purpose: to collect any remaining data at the end of the experiment
function done()
{
	document.getElementById("countdown").innerHTML = "You are done! You will find out your team score at the end of the experiment.";
	// save and report points to spreadsheet
	cordovaHTTP.get(url + '?initials=ASYNC&condition=ASYNC&timeline=ASYNC' +
		'&trial_count=ASYNC&atime=ASYNC&ptime=ASYNC&diff=ASYNC&' +
		'acondition=Asynchrony&sscore=&ascore=' + team_points, {}, {}, function(response) {});
	
	clearButton("P"); // clear buttons from screen (aesthetic choice)
	clearButton("E");
}

// Purpose: to track 40 seconds of time during the activity
function countDown()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 40000);
	var ms_count = 1;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;
		var randomNum = randomize();

		// make a random user's button appear a random amount of time
		// on average every 600ms
		if (ms_count == 60) {
			clearButton("P");
			clearButton("E");
		}
		if (ms_count == randomNum) { // make button appear some random number
			display("P");	      		// of seconds
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

		// buttons appear for 500ms and then off for 500ms
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
		}
	}, 1); // update interval every millisecond
}

// Purpose: to display the appropriate button given user type
//     ("P": participant, "E": experimenter)
function display(user)
{
	if (user == "P") document.getElementById("participant").style.visibility = "visible";
	else document.getElementById("experimenter").style.visibility = "visible";
}

// Purpose: to make a button on the screen invisible given the user type
//   ("P": participant, "E": experimenter)
function clearButton(user)
{
	if (user == "P") document.getElementById("participant").style.visibility = "hidden";
	else document.getElementById("experimenter").style.visibility = "hidden";
}

// Purpose: to generate a random number that determines how long the user waits
//     to press a button (avg during the minute needs to be 600ms)
function randomize()
{
	// randomly gets a number from the time_list saved at the top
	var randomized_time = time_list[Math.floor(Math.random()*time_list.length)];
	// once you get a random time, remove from list so it doesn't repeat
	var index = time_list.indexOf(randomized_time);
	if (index > -1) {
    	time_list.splice(index, 1);
	}
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