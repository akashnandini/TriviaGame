// global variables
var intervalId;
var ques_counter = 0;
var answeredCorrect = 0;
var answeredWrong = 0;
var unAnswered = 0;
var currentQuestion;

//Question array

var questions =[
	{
		question: "What was the first full length CGI movie?",
		answer1: "A Bug's Life", 
		answer2: "Monster Inc", 
		answer3: "Toy Story",
		answer4: "Lion King",
        correct: "Toy Story",
        image:   "toy_story"
	},
	{
		question: "Which of these is NOT a game of The Spice Girls?",
		answer1: "Sporty Spice",
		answer2: "Fred Spice",
		answer3: "Scary Spice",
		answer4: "Posh Spice",
        correct: "Fred Spice",
        image:   "fred_spice"
	},
	{
		question: "Which NBA teamwon the most title in the 90s?",
		answer1: "New York knicks", 
		answer2: "Portland Trailblazers", 
		answer3: "Los Angles Lakers",
		answer4: "Chicago Bulls",
        correct: "Chicago Bulls",
        image:   "chicago_bulls"
	},
	{
		question: "Which group released the hit song Smells Like Teen Spirit?",
		answer1: "Nirvana",
		answer2: "Backstreet Boys",
		answer3: "The Offering",
		answer4: "No Doubts",
        correct: "Nirvana",
        image:   "nirvana"
    },
    {
		question: "Which popular Disney movie featured the song, Circle of life?",
		answer1: "Aladin",
		answer2: "Hercules",
		answer3: "Mulan",
		answer4: "The Lion King",
        correct: "The Lion King",
        image:   "lion_king"
    },
    {
		question: "What was Doug's best friend's name?",
		answer1: "Skeeter",
		answer2: "Mark",
		answer3: "Zach",
		answer4: "Cody",
        correct: "Skeeter",
        image:   "skeeter"
	},
   
]; 

var questions_length = questions.length;
//console.log("questions_length== "+questions_length);


//correct answer

function correctAnswer(){
	$(".button").off("click");
	$(".answer-buttons").hide();	
    $(".question").text("Correct Answer!");
    $(".image").html("<center><img src=assets/images/"+questions[ques_counter].image+".jpg width='200px' height='200px'></center>");   
	ques_counter++;
	answeredCorrect++;
    clearInterval(intervalId);
    if ( ques_counter == questions_length){  
		setTimeout(endScreen, 1000 * 4);
	} else {
        setTimeout(displayQuestion, 1000 * 4);
    }
}

// Wrong answer
function wrongAnswer(){
	$(".button").off("click");
	$(".answer-buttons").hide();
    $(".question").text("Nope..The correct answer was " + questions[ques_counter].correct);
    console.log(questions[ques_counter].image);
    console.log(questions[ques_counter].correct);    
    $(".image").html("<center><img src=assets/images/"+questions[ques_counter].image+".jpg width='200px' height='200px'></center>");   
	ques_counter++;
	answeredWrong++
    clearInterval(intervalId);
	if ( ques_counter == questions_length){
		setTimeout(endScreen, 1000 * 2);
	} else {
        setTimeout(displayQuestion, 1000 * 2);
	}
	
}

//Interval
function noTime(){
	$(".button").off("click");
    $(".question").text("Time's Up!");
    $(".question").text("The correct answer was " + questions[ques_counter].correct);
    $(".image").html("<center><img src=assets/images/"+questions[ques_counter].image+".jpg width='200px' height='200px'></center>");   
	$(".answer-buttons").hide();
	ques_counter++;
	unAnswered++
	clearInterval(intervalId);
	if ( ques_counter == questions_length){
		setTimeout(endScreen, 1000 * 2);
	} else {
		setTimeout(displayQuestion, 1000 * 2);
	}
}

//Final Screen
function endScreen(){
    $(".answer-buttons").show();
	$(".ans1").text("Correct answers: " + answeredCorrect );
	$(".ans2").text("Wrong answers: " + answeredWrong );
	$(".ans3").text("Unanswered: " + unAnswered );
	$(".ans4").text("Start Over?");
	$(".ans4").on("click", function(){	
	    gameReset();
	    displayQuestion();
 	});

}



//Display the question and timer
function displayQuestion() {
	
	var timer = 6;	
	intervalId = setInterval(decrement, 1000);
	function decrement() {
      timer--;
      $(".timer").html("Time Remaining " + timer + " Seconds ");      
      if (timer === 0) {
      	  noTime();
      }
  	}
   	
	$(".button").off("click"); 
	//display and style the current question
    $(".question").text(questions[ques_counter].question);
    $(".image").empty();
	//show all the buttons and their answers
	$(".answer-buttons").show();
	$(".ans1").text(questions[ques_counter].answer1);
	$(".ans2").text(questions[ques_counter].answer2);
	$(".ans3").text(questions[ques_counter].answer3);
	$(".ans4").text(questions[ques_counter].answer4);
    
    //call the correctAnswer() or wrongAnswer()

	$(".button").on("click", function(){
	 	if ($(this).text() == questions[ques_counter].correct){
	 		correctAnswer();
	 	} else {
	 		wrongAnswer();
	 	}
 	});
}

//Reset all the variables
function gameReset() {
    ques_counter = 0;
    answeredCorrect = 0;
    answeredWrong = 0;
    unAnswered = 0;
}

//Main part
$(document).ready(function() {
	$(".ans1").text("Click Here To Start!");
	$(".ans2").hide();
	$(".ans3").hide();
	$(".ans4").hide();
	$(".button").on("click", function(){
        $(".ans1").show();
		$(".ans2").show();
		$(".ans3").show();
		$(".ans4").show();
		displayQuestion();
	});
});