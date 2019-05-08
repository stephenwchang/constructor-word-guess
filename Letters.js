const inquirer = require("inquirer");


function Letters(character) {
  this.character = character;
  this.guessed = false;
  this.returnChar = function() {
    if (this.guessed) {
      return this.character;
    } else {
      return '_';
    }
  }
  this.checkGuessed = function(char) {
    if (this.character === char) {
      this.guessed = true;
    }
  }
}

function Word(word) {
  this.word = word;
  this.currentGuess = '';
  this.lettersArray = [];
  for (i = 0; i < this.word.length; i++) {
    let pushedLetter = new Letters(this.word[i]);
    this.lettersArray.push(pushedLetter);
  }
  this.returnString = function() {
    let currentWord = '';
    for (i = 0; i < this.lettersArray.length; i++) {
      currentWord = currentWord + this.lettersArray[i].returnChar() + ' ';
    }
    this.currentGuess = currentWord;
    console.log(currentWord);

  }
  this.callGuess = function(char) {
    for (i = 0; i < this.lettersArray.length; i++) {
      this.lettersArray[i].checkGuessed(char);
    }
  }
}


let currentWord = new Word('monkey');
currentWord.returnString();
inquirerPrompt();

function inquirerPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Guess a letter',
      name: 'userGuess'
    }
  ]).then(function(response) {
    currentWord.callGuess(response.userGuess);
    currentWord.returnString();
    if (currentWord.currentGuess.indexOf('_') > -1) {
      console.log('run that again');
      inquirerPrompt();
    } else {
      console.log('you win');
    }
  });
}
