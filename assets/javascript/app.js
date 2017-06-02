$(document).ready(function() {
	
	var game = {
		
		questionArray: [
		{
			Q: "Name the type of Puppy!",
			ans: "German Shepherd",
			link: "assets/images/german-shepherd.jpg",
			choices: ["Boxer", "German Shepherd", "Bernese Mountain Dog", "Labrador"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "Border Collie",
			link: "assets/images/border-collie.jpg",
			choices: ["Border Collie", "Terrier", "Pitbull", "Labrador"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "Siberian Husky",
			link: "assets/images/siberian-husky.jpg",
			choices: ["Alaskan Malamute", "Border Collie", "Siberian Husky", "Labrador"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "French Bulldog",
			link: "assets/images/french-bulldog.jpg",
			choices: ["Boxer", "French Bulldog", "Shih Tzu", "Pug"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "Pitbull",
			link: "assets/images/pitbull.jpg",
			choices: ["Pitbull", "German Shepherd", "Dachshund", "Labrador"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "Golden Retriever",
			link: "assets/images/golden-retriever.jpg",
			choices: ["Golden Retriever", "German Shepherd", "Bernese Mountain Dog", "Labrador"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "St. Bernard",
			link: "assets/images/st-bernard.jpg",
			choices: ["St. Bernard", "German Shepherd", "Poodle", "Bernese Mountain Dog"]
		},
		{
			Q: "Name the type of Puppy!",
			ans: "Shih Tzu",
			link: "assets/images/shih-tzu.jpg",
			choices: ["Terrier", "Shih Tzu", "Chihuahua", "Poodle"]
		}
		],
		//round Num is game counter for number of questions that user has answered
		roundNum: 0,
		correctCount:0,
		wrongCount:0,
		//timer variable for each round
		timeInterval:null,
		
		//this function listens for the choices button selections which are created when initializing a new question
		answerSelection:function(){
			$(".js-choices").on("click",function(){
				//if user makes a selection, clear the countdown timer so game will not trigger timeExpired function
				clearInterval(game.timeInterval);
				//pass user answer to the answerQuestion function
				game.answerQuestion(this);
			});	
		},

		//this function checks the answer of user selections to questions and shows the results on screen
		answerQuestion: function(selection){
			//clear any page content for the result screen
			$("#content").html("");
			var result =$("<div>");
			var answer = $("<div>");
			result.addClass("message");
			answer.addClass("message");
			//show puppy image
			$("#content").append("<img class='puppyImg' src='"+this.questionArray[this.roundNum].link+"'>");
			//set answer div and display what user selected
			answer.text("You answered "+ $(selection).text());
			$("#content").append(answer);
			//set whether user response was correct and update counters
			if($(selection).text()===this.questionArray[this.roundNum].ans){
				result.text("Correct!");
				this.correctCount++;
			}
			else{
				result.text("Wrong. The correct answer was "+this.questionArray[this.roundNum].ans);
				this.wrongCount++;
			}
			//display whether answer was correct
			$("#content").append(result);
			this.nextQuestion();
		},

		//this function shows a countdown timer for each new question and shows answer screen with incorrect result if time expires
		countdownTimer: function(){
			var timer = $("<div>");
			var seconds=10;
			timer.addClass("timer");
			timer.text("00:"+seconds);
			$("#content").append(timer);
			//every second, update timer text and determine if time has expired.
			this.timeInterval=window.setInterval(function(){
				seconds--;
				seconds=("0" + seconds).slice(-2);
				if(seconds>0){
					timer.text("00:"+seconds);
				}
				else{
					game.timeExpired();
					//if time expires, clear interval so this function will work for the next question
					clearInterval(game.timeInterval);
				}	
			},1000);		
		},

		//this function shows the final game screen and has a reset button to restart questions from the beginning.
		endGame: function(){
			$("#content").html("");
			//create reset button
			var resetButton = $("<button>");
			resetButton.addClass("resetButton");
			resetButton.attr("id","resetGame");
			resetButton.text("Reset Game");
			//create end game message to notify user game is over
			var endGameMessage = $("<div>");
			endGameMessage.addClass("message")
			endGameMessage.text("Game Over!");
			//create wins & losses content to be displayed
			var wins = $("<div>");
			wins.addClass("message");
			wins.text("Correct Answers: "+ this.correctCount);
			var losses = $("<div>");
			losses.addClass("message");
			losses.text("Wrong Answers: "+this.wrongCount);
			//display end game content and listen for user to select the reset button
			$("#content").append(endGameMessage);
			$("#content").append(wins);
			$("#content").append(losses);
			$("#content").append(resetButton);
			$("#resetGame").on("click",function(){
				game.resetGame();
			});

		},

		//this function sets up the game with a start button
		initializeGame: function(){
			var startButton = $("<button>");
			startButton.addClass("startButton");
			startButton.attr("id","startGame");
			startButton.text("Start Game");
			$("#content").append(startButton);
			//listen for user input to begin game
			$("#startGame").on("click",function(){
				game.newQuestion();		
			});
		},

		//this function outputs multiple choice options for each question.
		newQuestion:function(){
			$("#content").html("");
			//create and start the countdown timer
			this.countdownTimer();
			//create new question message and display for the user
			var question = $("<div>");
			question.addClass("message");
			question.text(this.questionArray[this.roundNum].Q);
			$("#content").append(question);
			//display appropriate puppy image for the question
			$("#content").append("<img class='puppyImg' src='"+this.questionArray[this.roundNum].link+"'>");
			//create button selections for the user
			for(var i=0;i<this.questionArray[this.roundNum].choices.length;i++){
				$("#content").append($("<button class='choicesButton js-choices'>").text(this.questionArray[this.roundNum].choices[i]));
			}
			//listen to new buttons for user selection
			game.answerSelection();
				
		},
		
		//this function determines if there are any more questions to ask and then moves to the next question or end screen on a timeout.
		nextQuestion:function(){
			//wait 3 seconds on the answer screen and automatically move on.
			var answerScreenTimeout = setTimeout(function(){
	        	game.roundNum++;
	        	//if user has not been asked all the questions, create new question
	        	if(game.roundNum<game.questionArray.length){
	        		game.newQuestion();
	        	}
	        	//if user has answered all questions, go to end game.
	        	else{
	        		game.endGame();
	        	}	
	    	}, 3000);
		},	

		//this function shows a wrong answer associated with time expiring and moves to next question
		timeExpired: function(){
			$("#content").html("");
			this.wrongCount++;
			//display appropriate puppy image
			$("#content").append("<img class='puppyImg' src='"+this.questionArray[this.roundNum].link+"'>");
			//provide user message that time expired and provide correct answer.
			var result =$("<div>");
			result.addClass("message");
			result.text("Time Expired. The correct answer was "+this.questionArray[this.roundNum].ans);
			$("#content").append(result);
			//check to see if game over and provide new question after 3 seconds
			this.nextQuestion();
		},

		//this function resets game variables and starts asking new questions from the beginning
		resetGame: function(){
			this.roundNum= 0;
			this.correctCount=0;
			this.wrongCount=0;
			$("#content").html("");
			//note that this skips the start game button step.
			this.newQuestion();
		}

	};

	//start the game.
	game.initializeGame();

});