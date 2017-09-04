// Initialize Firebase
var config = {
  apiKey: "AIzaSyDhMgS7N2NMqIOGyh6ARIXhP7LIyeryFAU",
  authDomain: "weddemo-51cd7.firebaseapp.com",
  databaseURL: "https://weddemo-51cd7.firebaseio.com",
  projectId: "weddemo-51cd7",
  storageBucket: "weddemo-51cd7.appspot.com",
  messagingSenderId: "756577202474"
};
firebase.initializeApp(config);

database = firebase.database();

var name;
var destination;
var firstTrain ;
var frequency;
var currentTime;
var diffTime;
var nextArrival;
var minutesAway;
var remainder;
var nextTrain;
var firstTrainConverted;

$("#submitbtn").on("click", function(){
  event.preventDefault();
  name = $("#nameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrain = $("#firstTrainInput").val().trim();
  frequency = parseInt($("#frequencyInput").val().trim());

  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
});

database.ref().on("child_added", function(childSnapshot) {

  // Current Time
  currentTime = moment().format("hh:mm");

  // First Time (pushed back 1 year to make sure it comes before current time)
  firstTrainConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
  console.log("First Train Converted: " + firstTrainConverted);
  
  // Difference between the times
  diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("Difference in Time: " + diffTime);
  
  // Time apart (remainder)
  remainder = diffTime % childSnapshot.val().frequency;
  console.log("Reminder: " + remainder);
  
  // Minute Until Train
  minutesAway = childSnapshot.val().frequency - remainder;
  console.log("Minutes Until Train: " + minutesAway);
  
  // Next Train
  nextArrival = moment().add(minutesAway, "minutes");
  $("#tableBody").append("<tr class='column-row'><td class='tableName'>" + childSnapshot.val().name + "</td><td class='tableDestination'>" + childSnapshot.val().destination + "</td><td class='tableFrequency'>" + childSnapshot.val().frequency + "</td><td class='tablenextArrival'>" + moment(nextArrival).format("hh:mm") + "</td><td class='tableMinutesAway'>" + minutesAway + "</td></tr>");

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});