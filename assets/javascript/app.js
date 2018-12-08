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
		answer2:"Monster Inc", 
		answer3:"Toy Story",
		answer4:"Lion King",
		correct: "Monster Inc"
	},
	{
		question: "Which of these is NOT a game of The Spice Girls?",
		answer1: "Sporty Spice",
		answer2: "Fried Spice",
		answer3: "Scary Spice",
		answer4: "Posh Spice",
		correct: "Scary Spice"
	},
	{
		question: "Which NBA teamwon the most title in the 90s?",
		answer1: "New York knicks", 
		answer2:"Portland Trailblazers", 
		answer3:"Los Angles Lakers",
		answer4:"Chicago Bulls",
		correct: "New York knicks"
	},
	{
		question: "Which group released the hit song Smells Like Teen Spirit?",
		answer1: "Nirvana",
		answer2: "Backstreet Boys",
		answer3: "The Offering",
		answer4:"No Doubts",
		correct: "The Offering"
	},
   
]; 

var questions_length = questions.length;


//correct answer

function correctAnswer(){
	$(".button").off("click");
	$(".answer-buttons").hide();	
    //$('.question').text("Correct Answer!");
    $('.question').html("Correct Answer!");
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
	$('.button').off("click");
	$('.answer-buttons').hide();
	$('.question').text("Nope..Wrong Answer! The correct answer was " + questions[ques_counter].correct);
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
	$('.button').off("click");
	$('.question').text("Time's Up!").css({"color" : "red", "font-size" : "5em"});
	$('.answer-buttons').hide();
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
	$('.answer-buttons').show();
	$('.ans1').text("Correct answers: " + answeredCorrect );
	$('.ans2').text("Wrong answers: " + answeredWrong );
	$('.ans3').text("Unanswered: " + unAnswered );
	$('.ans4').text(" Click Here To Play Again");
	$('.ans4').on("click", function(){	
	    gameReset();
	    displayQuestion();
 	});

}



//Display the question and timer
function displayQuestion() {
	
	var timer = 16;	
	intervalId = setInterval(decrement, 1000);
	function decrement() {
      timer--;
      $(".timer").html("Time Remaining " + timer + " Seconds ");      
      if (timer === 0) {
      	noTime();
      }
  	}
   	
	$('.button').off("click"); 
	//display and style the current question
	$('.question').text(questions[ques_counter].question).css({"color" : "white", "font-size" : "3em", "border" : ""});
	//show all the buttons and their answers
	$('.answer-buttons').show();
	$('.ans1').text(questions[ques_counter].answer1);
	$('.ans2').text(questions[ques_counter].answer2);
	$('.ans3').text(questions[ques_counter].answer3);
	$('.ans4').text(questions[ques_counter].answer4);
    
    //call the correctAnswer() or wrongAnswer()

	$('.button').on("click", function(){
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
	$('.ans1').text("Click Here To Start!");
	$('.ans2').hide();
	$('.ans3').hide();
	$('.ans4').hide();
	$('.button').on("click", function(){
        $('.ans1').show();
		$('.ans2').show();
		$('.ans3').show();
		$('.ans4').show();
		displayQuestion();
	});
});