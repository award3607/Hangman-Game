

object/array carmakerList{
	contains list of carmakers
}

array playerGuesses[contains list of all the player's guesses so far]

initGame() {
	reset wins
	
	call initRound();
}

initRound() {
	reset guesses remaining
	pick new word from carmakerList
	reset playerGuesses[]
}

startKeyCapture() {
	adds document.onkeyup listener
}

stopKeyCapture() {
	removes document.onkeyup listener
}

evalGuess(key) {
	key.toUpperCase();
	if(key in playerGuesses[])
		display "letter already guessed" message
		return
	else if(key in selected carmaker)
		reveal the correct letter(s) on hidden word

	decrement guesses remaining
	push key to playerGuesses[]
	updateUI();
}


set up hidden word() {
	create wordDisplay array same size as wordToGuess, but for each character, use a &nbsp;
	write array to page using a regular space between each array item
	unguessed characters will be &nbsp;
	when character(s) is guessed, use the character's index in wordToGuess to set index of wordDisplay to character (getting rid of &nbsp for that index)
	span will have an id="char<index>", e.g., "char0", "char1", "char2"
}

<span id="char0" class="letter">F</span> 
<span id="char1" class="letter">o</span> 
<span id="char2" class="letter">r</span> 
<span id="char3" class="letter">d</span>

span.letter {
	text-decoration: underline;
}


revealHidden needs to take a letter and an array of the indices where it goes

updateElementById(("char" + index), letter) for each index


document.getElementById('tag-id').innerHTML = '<ol><li>html data</li></ol>';


evalWinOrLose() {
	if all letters in word have been guessed && guesses remaing > 0
		player wins
	else if guesses remaining < 1
		player loses
	else
		do nothing //game continues
}

need array that contains unique letters in word?
	pop correctly guessed letters from this array?
	when array.length = 0, all letters have been correctly guessed
	trigger win condition