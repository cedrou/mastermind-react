/*
 * mastermind.js - Game logic
 */

var Mastermind = function (codeSize, colorSize, maxTrials) {
    this.codeSize = codeSize;
    this.colorSize = colorSize;
    this.maxTrials = maxTrials;
    this.code = this.create_code(codeSize);
    this.guess = [];
    this.guesses = [];
    this.trials = 0;
    this.isGameOver = false;
    this.isSuccess = false;
};

Mastermind.RED = 0;
Mastermind.YELLOW = 1;
Mastermind.GREEN = 2;
Mastermind.BLUE = 3;
Mastermind.ORANGE = 4;
Mastermind.WHITE = 5;
Mastermind.PURPLE = 6;
Mastermind.PINK = 7;

Mastermind.prototype.create_code = function () {
    var c = [];
    for (var i = 0; i < this.codeSize; i++)
        c[i] = Math.floor(Math.random() * this.colorSize);
    return c;
}

Mastermind.prototype.play = function () {
    var positionMatches = 0;
    var colorMatches = 0;
    var codeMatched = [];
    var guessMatched = [];
    for (var i = 0; i < this.codeSize; i++) {
        codeMatched[i] = false;
        guessMatched[i] = false;
    }

	this.trials++;

	console.log("Try " + this.trials + "/" + this.maxTrials + " " + this.guess);

    // first check full matches (position + color)
    for (var i = 0; i < this.codeSize; i++) {
        if (this.guess[i] == this.code[i]) {
            codeMatched[i] = true;
            guessMatched[i] = true;
            positionMatches++;
        }
    }

    // then check for color matches
    if (positionMatches < this.codeSize)
        for (var i = 0; i < this.codeSize; i++) {
            if (guessMatched[i]) continue;

            for (var j = 0; j < this.codeSize; j++) {
                if (codeMatched[j]) continue;

                if (this.guess[i] == this.code[j]) {
                    guessMatched[i] = true;
                    codeMatched[j] = true;
                    colorMatches++;
                }
            }
        }


    var newGuess = {};
    newGuess.guess = this.guess;
    newGuess.positionMatches = positionMatches;
    newGuess.colorMatches = colorMatches;

    this.guesses.push(newGuess);

    this.guess = [];

    if (newGuess.positionMatches == this.codeSize)
    {
        this.isSuccess = true;
	    console.log("SUCCESS");
    }

    if (this.trials == this.maxTrials)
    {
        this.isGameOver = true;
        console.log("GAME OVER");
    }
}
