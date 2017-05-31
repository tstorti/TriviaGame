$(document).ready(function() {
	
	var game = {
		
		questionArray: [
		{
			Q: "What is the capital of Afghanistan?",
			ans: "Kabul",
			c1: "Tirana",
			c2: "Kabul",
			c3: "Dushanbe",
			c4: "Tashkent"
		},
		{
			Q: "What is the capital of Australia?",
			ans: "Canberra",
			c1: "Canberra",
			c2: "Sydney",
			c3: "Melbourne",
			c4: "Ottawa"
		},
		{
			Q: "What is the capital of Belgium?",
			ans: "Brussels",
			c1: "Amsterdam",
			c2: "Luxemburg",
			c3: "Brussels",
			c4: "Stockholm"
		},
		{
			Q: "What is the capital of Greece?",
			ans: "Athens",
			c1: "Ankara",
			c2: "Athens",
			c3: "Sofia",
			c4: "Thessaloniki"
		},
		{
			Q: "What is the capital of Italy?",
			ans: "Rome",
			c1: "Venice",
			c2: "Rome",
			c3: "Naples",
			c4: "Milan"
		},
		{
			Q: "What is the capital of Israel?",
			ans: "Jerusalem",
			c1: "Tel Aviv",
			c2: "Kabul",
			c3: "Jerusalem",
			c4: "Islamabad"
		}
		],

		roundNum: 0,
		correctCount:0,
		wrongCount:0,
		timeInterval:null,
		
		//this function listens for the choices button selections which are created when initializing a new question
		answerSelection:function(){
			$(".js-choices").on("click",function(){
				clearInterval(game.timeInterval);
				game.answerQuestion(this);
			});	
		},

		//this function checks the answer of user selections to questions and shows the results on screen
		answerQuestion: function(selection){
			$("#questionBlock").html("");
			var result =$("<div>");
			var answer = $("<div>");
			answer.addClass("answer");
			answer.text("You answered "+ $(selection).text());
			if($(selection).text()===this.questionArray[this.roundNum].ans){
				result.text("Correct!");
				this.correctCount++;
			}
			else{
				result.text("Wrong. The correct answer was "+this.questionArray[this.roundNum].ans);
				this.wrongCount++;
			}
			$("#answerBlock").append(answer);
			$("#answerBlock").append(result);
			this.nextQuestion();
		},

		//this function shows a countdown timer for each new question and shows answer screen with incorrect result if time expires
		countdownTimer: function(){
			var timer = $("<div>");
			var seconds=10;
			$("#questionBlock").append(timer);
			timer.text("00:"+seconds);
			this.timeInterval=window.setInterval(function(){
				seconds--;
				seconds=("0" + seconds).slice(-2);
				if(seconds>0){
					timer.text("00:"+seconds);
				}
				else{
					game.timeExpired();
					clearInterval(game.timeInterval);
				}	
			},1000);		
		},

		//this function shows a wrong answer associated with time expiring and moves to next question
		timeExpired: function(){
			$("#questionBlock").html("");
			var result =$("<div>");
			result.text("Time Expired. The correct answer was "+this.questionArray[this.roundNum].ans);
			this.wrongCount++;
			$("#answerBlock").append(result);
			this.nextQuestion();
		},

		//this function sets up the game with a start button
		initializeGame: function(){
			var startButton = $("<button>");
			startButton.addClass("startButton");
			startButton.attr("id","startGame");
			startButton.text("Start Game");
			$("#startPage").append(startButton);
		},
		
		//this function outputs multiple choice options for each question.
		newQuestion:function(){
			this.countdownTimer();
			$("#startPage").html("");
			$("#answerBlock").html("");
			var question = $("<div>");
			question.addClass("question");
			question.text(this.questionArray[this.roundNum].Q);
			$("#questionBlock").append(question);
			$("#questionBlock").append(question);
			$("#questionBlock").append($("<button class='js-choices'>").text(this.questionArray[this.roundNum].c1));
			$("#questionBlock").append($("<button class='js-choices'>").text(this.questionArray[this.roundNum].c2));
			$("#questionBlock").append($("<button class='js-choices'>").text(this.questionArray[this.roundNum].c3));
			$("#questionBlock").append($("<button class='js-choices'>").text(this.questionArray[this.roundNum].c4));	
		},
		
		//this function determines if there are any more questions to ask and then moves to the next question or end screen on a timeout.
		nextQuestion:function(){
			var answerScreenTimeout = setTimeout(function(){
	        	game.roundNum++;
	        	if(game.roundNum<game.questionArray.length){
	        		game.newQuestion();
	        		game.answerSelection();
	        	}
	        	else{
	        		game.endGame();
	        	}	
	    	}, 1000);
		},
		
		//this function shows the final game screen and has a reset button to restart questions from the beginning.
		endGame: function(){
			
			$("#answerBlock").html("");
			var resetButton = $("<button>");
			resetButton.addClass("resetButton");
			resetButton.attr("id","resetGame");
			resetButton.text("Reset Game");
			var endGameMessage = $("<div>");
			endGameMessage.text("Game Over");
			var wins = $("<div>");
			wins.text("Correct Answers: "+ this.correctCount);
			var losses = $("<div>");
			losses.text("Wrong Answers: "+this.wrongCount);
			$("#endPage").append(endGameMessage);
			$("#endPage").append(wins);
			$("#endPage").append(losses);
			$("#endPage").append(resetButton);
			$("#resetGame").on("click",function(){
				game.resetGame();
			});

		},
		//this function resets game variables and starts asking new questions from the beginning
		resetGame: function(){
			this.roundNum= 0;
			this.correctCount=0;
			this.wrongCount=0;
			$("#endPage").html("");
			this.newQuestion();
			this.answerSelection();
		}

	};


	game.initializeGame();

	$("#startGame").on("click",function(){
		game.newQuestion();
		game.answerSelection();
	});


});