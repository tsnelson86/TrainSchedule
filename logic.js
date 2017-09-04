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

$("#submitbtn").on("click", function(){
  event.preventDefault();
  name = $("#nameInput").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrainInput").val().trim();
  frequency = parseInt($("#frequency").val().trim());

  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  });
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  $("#tableBody").append("<tr class='column-row'><td class='tableName'>" + childSnapshot.val().name + "</td><td class='tableDestination'>" + childSnapshot.val().destination + "</td><td class='tablefirstTrain'>" + childSnapshot.val().firstTrain + "</td><td class='tablefirstTrain'>" + firstTrain + "</td><td class='tableFrequency'>" + "$" + childSnapshot.val().frequency + "</td><td class='tableNextArrival'>" + nextArrival + "</td><td class='tableMinutesAway'>" + minutesAway + "</td></tr>");

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});