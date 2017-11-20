// data.js
// Purpose: to catch when the participant and experimenter click their randomly 
//		appearing buttons on the respective sides of the screen for a minute

var url = 'https://script.google.com/macros/s/AKfycbyNMG8aeE9v7qAHw66EwIUirikwvlZhRC_lr5htg9V-83ZzGnE/exec';
var click_window = 250;
var team_points = 0;
var total time = 60000;

// Purpose: to start the timer and have the experimenter last one minute; have
//     the buttons randomly appear on either side of the screen
function start()
{
	// have a timer start
	// at random times during the timer (have it sleep ?), make
	// the buttons appear randomly and then disappear after the window
}

// Purpose: to collect any remaining data at the end of the experiment
function done()
{
	// when time is up, collect team_points and anything else you might need
}

// Purpose: to generate a random number that determines how long the user waits
//     to press a button
function randomize()
{
	// need a way to figure out a time for each button to randomly appear, but
	// make sure that over the entire minute, it averages out to be a 600ms wait
}

// Purpose: when the participant clicks their button, add a point to team_points
//		Keep track of how far off the participant was from seeing the button
//      appear and actually clicking it
function triggerP()
{
	// given total time and time of the appeared button (+ total time in some way),
	// see how close the user is. 
	// Send data to another google spreadsheet

	team_points++;
}

// Purpose: when the experimenter clicks their button, add a point to team_points
//		Keep track of how far off the experimenter was from seeing the button
//      appear and actually clicking it
function triggerE()
{
	// will be very similar to triggerP; how you store info will be different
	// though
	// send data to another google spreadsheet

	team_points++;
}