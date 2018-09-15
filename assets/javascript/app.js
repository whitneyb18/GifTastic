var config = {
  apiKey: "AIzaSyCGAiHKAfGI0XA-kfrhzEtzpPECpJDiUD8",
  authDomain: "y-allbejealous.firebaseapp.com",
  databaseURL: "https://y-allbejealous.firebaseio.com",
  projectId: "y-allbejealous",
  storageBucket: "y-allbejealous.appspot.com",
  messagingSenderId: "1038124739690"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// Initial Values
var trainName = "";
var trainDestination = "";
var firstTime = 0;
var frequency = "";

// Capture Button Click
$("#addingTrain").on("click", function(event) {
  // Don't refresh the page!
  event.preventDefault();
  trainName = $("#trainName")
    .val()
    .trim();
  trainDestination = $("#trainDestination")
    .val()
    .trim();
  firstTime = $("#firstTrainTime")
    .val()
    .trim();
  frequency = $("#trainFrequency")
    .val()
    .trim();

  database.ref().push({
    name: trainName,
    destination: trainDestination,
    firstTime: firstTime,
    frequency: frequency
  });
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#firstTrainTime").val("");
  $("#trainFrequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  var tFrequency = childSnapshot.val().frequency;
  var firstTimeCal = childSnapshot.val().firstTime;
  console.log(tFrequency);
  console.log(firstTimeCal);

  var firstTimeConverted = moment(firstTimeCal, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>");
  var tableTrainName = $("<td>").text(childSnapshot.val().name);
  var tableDestination = $("<td>").text(childSnapshot.val().destination);
  var tableFrequency = $("<td>").text(childSnapshot.val().frequency);
  var tableNextArrival = $("<td>").text(tMinutesTillTrain);
  var tableTrainTime = $("<td>").text(moment(nextTrain).format("hh:mm"));

  newRow.append(
    tableTrainName,
    tableDestination,
    tableFrequency,
    tableTrainTime,
    tableNextArrival
  );

  $("#table-data").append(newRow);
});
