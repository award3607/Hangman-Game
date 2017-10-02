var Game = {
	carmakerList: ["Ford", "Chevrolet", "Ferrari", "Lamborghini", "Maserati", "BMW", "Audi", "Mercedes", "Porsche", "Lotus", "McLaren"],
	wins: 0,
	wordToGuess: "",
	guessWordHtml: "",
	guessesRemaining: 15,
	lettersGuessed: [],

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
	},

	setWord: function() {
		this.wordToGuess = this.selectRandomItem(this.carmakerList);
		for (var i = 0; i < this.wordToGuess.length; i++) {
			this.guessWordHtml += "<span class=\"underline\" id=\"char" + i + "\">&nbsp;</span>&nbsp;";
		}
		document.getElementById("word").innerHTML = this.guessWordHtml;
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

	},

	updateUI: function() {
		this.updateElementById("games-won", this.wins);
		// this.updateElementById("word", this.guessWordHtml);
		this.updateElementById("guesses-remaining", this.guessesRemaining);
		this.updateElementById("letters-guessed", this.lettersGuessed.join(" "));
	},

	selectRandomItem: function(arr) {
		var item = arr[((Math.floor(Math.random() * arr.length)))];
		console.log(item);
		return item;
	},

	revealLetter: function(letter) {
		for (var i = 0; i < this.wordToGuess.length; i++) {
			if(letter == this.wordToGuess[i].toLowerCase()) {
				this.updateElementById(("char" + i), this.wordToGuess[i]);
			}
		}
	},

	updateElementById: function(id, value) {
		var el = document.getElementById(id);
		el.textContent = value.toString();
	},

	startListener: function() {
		var self = this;
		document.onkeyup = function(event) {
			console.log(event.key.toLowerCase());
			// return event.key;
			self.evalGuess(event.key.toLowerCase());
		}
	}

};

Game.initGame();
// Game.startListener();