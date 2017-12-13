// data.js
// Purpose: to catch when the participant and experimenter click their randomly 
//		appearing buttons on the respective sides of the screen for a minute

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var team_points = 0;
var total_possible_points = 0;
// average number is 120 which is ~600ms
//var time_listP = [171, 75, 131, 92, 116, 66, 120, 64, 66, 169, 123, 136, 143, 94, 73, 104, 160, 171, 180, 172, 136, 129, 128, 96, 63, 124, 152, 159, 111, 136, 85, 101, 77, 127, 148, 100, 141, 67, 176, 129, 67, 73, 82, 119, 159, 177, 115, 151, 139, 99, 64, 165, 99, 138, 176, 106, 101, 172, 74, 89, 74, 148, 141, 128, 75, 179, 120];
//var time_listE = [171, 75, 131, 92, 116, 66, 120, 64, 66, 169, 123, 136, 143, 94, 73, 104, 160, 171, 180, 172, 136, 129, 128, 96, 63, 124, 152, 159, 111, 136, 85, 101, 77, 127, 148, 100, 141, 67, 176, 129, 67, 73, 82, 119, 159, 177, 115, 151, 139, 99, 64, 165, 99, 138, 176, 106, 101, 172, 74, 89, 74, 148, 141, 128, 75, 179, 120];

var time_listP = [213, 233, 161, 278, 234, 243, 228, 288, 192, 180, 227, 291, 151, 248, 178, 210, 171, 229, 188, 267, 155, 164, 255, 225, 248, 176, 204, 256, 235, 165, 290, 235, 169, 208, 249, 185, 266, 256, 184, 220, 201, 281, 228, 152, 265, 287, 187, 193, 165, 180, 229, 205, 286, 171, 234, 273, 294, 223, 157, 226, 247, 177,	256, 296, 266, 286,	264, 239, 289, 279, 196, 296, 286, 249,	274, 165, 225, 224,	288, 236, 218, 182,	188, 259, 183, 282,	202, 249, 223, 259, 221, 192, 155, 274,	182, 179, 154, 182,	289, 159];
var time_listE = [213, 233, 161, 278, 234, 243, 228, 288, 192, 180, 227, 291, 151, 248, 178, 210, 171, 229, 188, 267, 155, 164, 255, 225, 248, 176, 204, 256, 235, 165, 290, 235, 169, 208, 249, 185, 266, 256, 184, 220, 201, 281, 228, 152, 265, 287, 187, 193, 165, 180, 229, 205, 286, 171, 234, 273, 294, 223, 157, 226, 247, 177,	256, 296, 266, 286,	264, 239, 289, 279, 196, 296, 286, 249,	274, 165, 225, 224,	288, 236, 218, 182,	188, 259, 183, 282,	202, 249, 223, 259, 221, 192, 155, 274,	182, 179, 154, 182,	289, 159];



// Purpose: to start the timer and have the experimenter last one minute; have
//     the buttons randomly appear on either side of the screen
function start()
{
	// make the start button disappear
	var element = document.getElementById("start");
	element.parentNode.removeChild(element);
	
	countDownParticipant();
	countDownExperimenter();
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
	var success_rate = team_points/total_possible_points;
	document.getElementById("countdown").innerHTML = "You are done! You will find out your team score at the end of the experiment.";
	// save and report points to spreadsheet
	cordovaHTTP.get(url + '?initials=&condition=ASYNC&timeline=ASYNC' +
		'&trial_count=ASYNC&atime=ASYNC&ptime=ASYNC&diff=ASYNC&poff=ASYNC' +
		'&acondition=Asynchrony&sscore=&ascore=' + team_points + '&poss_points=' +
		total_possible_points + '&success=' + success_rate, {}, {}, function(response) {});
	
	clearButton("P"); // clear buttons from screen (aesthetic choice)
	clearButton("E");
}

// Purpose: to track 40 seconds of time during the activity
function countDownParticipant()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 40000);
	var ms_count = 1;
	var randomized_time = 200;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;
		
		// make participant's button appear on average every 600ms
		if (ms_count == 100) {
			clearButton("P");
			// randomly gets a number from the time_list at the top
			randomized_time = randomize(time_listP);
		}
		// make button appear some random number of seconds after being cleared
		if (ms_count == randomized_time) { 
			display("P");
			ms_count = 0;
			total_possible_points++;
		}
		ms_count++;
		
		if (distance < 0) { // if count down is finished, display to screen
			clearInterval(x);
			done();
		}
	}, 1); // update interval every millisecond
}

// Purpose: to track 40 seconds of time during the activity
function countDownExperimenter()
{
	var startTime = new Date();
	var endingTime = new Date(startTime.getTime() + 40000);
	var ms_count = 1;
	var randomized_time = 200;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;
		//var randomNum = randomize();
		//console.log("Randomnum: " + randomNum);
		
		// buttons appear on average every 850ms 
		// (could go back to 600ms where ms_count was 60 but it was very fast)
		if (ms_count == 100) {
			clearButton("E");
			// randomly gets a number from the time_list saved at the top
			randomized_time = randomize(time_listE);
		}
		// make button appear some random number of seconds after being cleared
		if (ms_count == randomized_time) { 
			display("E");
			ms_count = 0;
			total_possible_points++;
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
	var randomized_time = 120;
	
	var x = setInterval(function() {
		// get current time and find distance between now and end
		var current = new Date();
		var distance = endingTime - current;

		// buttons appear on average every 850ms 
		// (could go back to 600ms where ms_count was 60 but it was very fast) 
		if (ms_count == 100) {
			clearButton("P");
			randomized_time = randomize(time_listE);
		}
		if (ms_count == randomized_time) { 
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
function randomize(time_list)
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