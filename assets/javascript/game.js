var Game = {
	carmakerList: ["Ford", "Chevrolet", "Ferrari", "Lamborghini", "Maserati", "BMW", "Audi", "Mercedes", "Porsche", "Lotus", "McLaren",
					"Honda", "Toyota", "Mitsubishi", "Subaru", "Nissan", "Datsun", "Mazda", "Volkswagen"],
	wins: 0,
	wordToGuess: "",
	guessWordHtml: "",
	guessesRemaining: 15,
	lettersGuessed: [],
	wordArr: [],

	initGame: function() {
		this.wins = 0;
		this.initRound();
		this.updateUI();
		this.startListener();
	},

	initRound: function() {
		this.setWord();
		this.guessesRemaining = this.wordToGuess.length + 10;
		this.lettersGuessed = [];
		this.updateUI();
		this.updateElementById("msg", "");
	},

	setWord: function() {
		document.getElementById("word").innerHTML = "";
		this.guessWordHtml = "";
		this.wordToGuess = this.selectRandomItem(this.carmakerList);
		for (var i = 0; i < this.wordToGuess.length; i++) {
			this.guessWordHtml += "<span class=\"underline\" id=\"char" + i + "\">&nbsp;</span>&nbsp;";
		}
		document.getElementById("word").innerHTML = this.guessWordHtml;
		this.wordArr = this.wordToGuess.toLowerCase().split("");
	},

	evalGuess: function(letter) {
		if(this.lettersGuessed.includes(letter)) {
			console.log("You already guessed " + letter);
			this.updateElementById("msg", "You already guessed " + letter + ".");
			return;
		}
		else if(this.wordToGuess.toLowerCase().includes(letter)) {
			console.log("Good guess. " + letter);
			this.updateElementById("msg", "Good guess! " + letter.toUpperCase() + " is in the word.");
			this.revealLetter(letter);
			this.wordArr = this.wordArr.filter(function(s) {
				return s !== letter;
			});
		}
		else {
			console.log(letter + " is not in the word.");
			this.updateElementById("msg", "Try again! " + letter.toUpperCase() + " is not in the word.");
		}
		this.guessesRemaining--;
		this.lettersGuessed.push(letter);
		this.evalWinLose();
		this.updateUI();
	},

	evalWinLose: function() {
		var self = this;
		if (this.wordArr.length < 1 && this.guessesRemaining > 0) {
			this.wins++;
			this.updateElementById("msg", "Congratulations, you won!");
			var audio = new Audio('assets/audio/car_pass.mp3');
			audio.play();
			// this.initRound();
			window.setTimeout(this.initRound.bind(this), 4000);
		}
		else if (this.guessesRemaining < 1) {
			this.updateElementById("msg", "Sorry, you lost. The word was " + this.wordToGuess + ".");
			var audio = new Audio('assets/audio/car_crash.mp3');
			audio.play();
			// this.initRound();
			window.setTimeout(this.initRound.bind(this), 4000);
		}
	},

	updateUI: function() {
		this.updateElementById("games-won", this.wins);
		this.updateElementById("guesses-remaining", this.guessesRemaining);
		this.updateElementById("letters-guessed", this.lettersGuessed.join(" "));
	},

	selectRandomItem: function(arr) {
		var item = arr[((Math.floor(Math.random() * arr.length)))];
		// console.log(item);
		return item;
	},

	revealLetter: function(letter) {
		for (var i = 0; i < this.wordToGuess.length; i++) {
			if(letter == this.wordToGuess[i].toLowerCase()) {
				this.updateElementById("char" + i, this.wordToGuess[i]);
			}
		}
	},

	updateElementById: function(id, value) {
		var el = document.getElementById(id);
		el.textContent = value.toString();
		el.style.visibility = "visible";
	},

	startListener: function() {
		var self = this;
		document.onkeyup = function(event) {
			console.log(event.key.toLowerCase());
			self.evalGuess(event.key.toLowerCase());
		}
	}

};

Game.initGame();
