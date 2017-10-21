

var questions = [{
		question: "On a London Underground map, what colour is the Circle Line?",
		answer: ["Yellow", "Red", "Blue", "Green"],
		correctAnswer: "Yellow"
}, {
		question: "How many sovereign states are members of the United Nations?",
		answer: ["201", "153", "195", "178"],
		correctAnswer: "195"
}, {
		question: "Which of these is NOT a city in Saudi Arabia?",
		answer: ["Riyadh", "Dubai", "Mecca", "Medina"],
		correctAnswer: "Dubai"
}, {
		question: "Which European city has the highest mileage of canals in the world?",
		answer: ["Venice", "Birmingham", "Amsterdam", "Berlin"],
		correctAnswer: "Birmingham"
}, {
		question: "Which of the following countries does NOT recognize Armenia as an independent country?",
		answer: ["Iran", "Turkey", "Azerbaijan", "Pakistan"],
		correctAnswer: "Pakistan"
}, {
		question: "The World Health Organization headquarters is located in which European country?",
		answer: ["United Kingdom", "France", "Switzerland", "Belgium"],
		correctAnswer: "Switzerland"
}, {
		question: "What is the capital of Senegal?",
		answer: ["Dakar", "Nouakchott", "Durhkir", "Liberia"],
		correctAnswer: "Dakar"
}, {
		question: "Which Canadian province has Charlottetown as its capital?",
		answer: ["Saskachewan", "Northwest Terrirories", "Ontario", "Prince Edward Island"],
		correctAnswer: "Prince Edward Island"
}, {
		question: "What is the highest mountain in the world?",
		answer: ["Mount Godwin Austen", "Mt. Everest", "Kangchenjunga", "Annapurna"],
		correctAnswer: "Mt. Everest"
}, {
		question: "What African country has Portuguese as its official language?",
		answer: ["Mozambique", "Gabon", "Togo", "Botswana"],
		correctAnswer: "Mozambique"
}]

var game = {
	correct: 0,
	incorrect: 0,
	counter: 10,
	questionCount: 0

}
var questionDOM = $("#question");
var answerDOM = $("#answers");
var wrongRight = $("#wrongRight");
var counter;

function countDown(){
	game.counter--;
	$("#counter").html(game.counter);
	if(game.counter <= 0) {
		console.log("Time is up!");
		if (game.questionCount < questions.length) {
			nextQuestion();
		}else{
			done();
		}
	}
}

//setInterval that runs  a functionevery second
function startCount() {
	$("#counter").html(game.counter);
	counter = setInterval(countDown, 1000);
};

function displayQuestion(){
//display one question on the screen/
	$("#startbutton").hide();
	startCount();
	answerDOM.empty();
	questionDOM.empty();
	wrongRight.empty();
	//grab our array
	var chosenQuestion = questions[game.questionCount];
	//get a button
	var pQuestion = $("<p>");

	//add qValue to button
	pQuestion.text(chosenQuestion.question);

	for (var i = 0; i < chosenQuestion.answer.length; i++) {
		var aBtn = $("<button>");
		aBtn.attr("data-value", chosenQuestion.answer[i]);
		aBtn.text(chosenQuestion.answer[i]);
		aBtn.addClass("results");
		answerDOM.append(aBtn);
	};
	questionDOM.html(pQuestion);
	
}

function nextQuestion (){
	game.counter = 10;
	clearInterval(counter);

	$("#wrongRight").html("<p>the correct answer is "+ questions[game.questionCount].correctAnswer +".</p>")
	game.questionCount++;
	if (game.questionCount < questions.length) {
		setTimeout(displayQuestion, 3000);
	}else{
		done();
	}
}

$("#answers").on("click", ".results", function() {
	// body...
	console.log($(this).attr("data-value"));
	var chosenBtn = $(this).attr("data-value");
	var correctAnswer = questions[game.questionCount].correctAnswer;
	if (correctAnswer === chosenBtn) {
		game.correct++;
		console.log("you got em");

		nextQuestion();
	}else if (correctAnswer !== chosenBtn){
		console.log("you got em wrong");
		game.incorrect++;
		nextQuestion();
	}
})

$("#startbutton").on("click", function() {
	displayQuestion();
})

function done (){
	clearInterval(counter);
	answerDOM.empty();
	questionDOM.empty();
	wrongRight.empty();
	answerDOM.append("Correct Answers: " + game.correct + " | " + "Incorrect Answers: " + game.incorrect);
	game.questionCount = 0;
	$("#counter").html("Time's Up");
	$("#startbutton").show();
}









//