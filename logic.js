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

var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;

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

nextArrival = 0;
//firebase.database.ServerValue.TIMESTAMP
//var workingDate = Math.abs(childSnapshot.val().dateAdded - new Date(childSnapshot.val().startDate).getTime());
//monthsWorked = Math.floor(workingDate / 1000 / 60 / 60 / 24 / 30);
//totalBilled = monthsWorked * parseInt(childSnapshot.val().monthlyRate);

minutesAway = 0;

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  $("#tableBody").append("<tr class='column-row'><td class='tableName'>" + childSnapshot.val().name + "</td><td class='tableDestination'>" + childSnapshot.val().destination + "</td><td class='tableFrequency'>" + childSnapshot.val().frequency + "</td><td class='tablenextArrival'>" + nextArrival + "</td><td class='tableMinutesAway'>" + childSnapshot.val().minutesAway + "</td></tr>");

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});