var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pickWord = function () {
    var words = [
      "программа",
      "макака",
      "красный",
      "облоко"
    ];
    return words[Math.floor(Math.random() * words.length)];
};
var setupAnswerArray = function (word){
    var answerArray = [];
    for (var i = 0; i < word.length; i++){
        answerArray[i]="_";
    }
    return answerArray;
};

var showPlayerProgress = function (answerArray){
    alert (answerArray.join(" "));
};

var getGuess = function () {
    return prompt("Угадайте букву, или нажмите Отмена для выхода из игры.");
};

var updateGameState = function (guess, word, answerArray){
    var appearances = 0;
    for (var j = 0; j < word.length; j++){
        if (word[j]===guess){
            answerArray[j] = guess;
            drawCorrectGuess(guess, j);
            appearances++;
        }
    }
    return appearances;
};

var showAnswerAndCongratulatePlayer = function (answerArray) {
    showPlayerProgress(answerArray);
    alert("Отлично! Было загадано слово " + answerArray.join(""));
};

var drawSegment = function (incorrectGuesses){
    ctx.lineWidth = 4;
    if (incorrectGuesses === 0) {
        ctx.strokeRect(20,20,20,20);
    }
    else if (incorrectGuesses === 1){
        ctx.beginPath();
        ctx.moveTo(30,40);
        ctx.lineTo(30,80);
        ctx.stroke();
    }
    else if (incorrectGuesses === 2){
        ctx.beginPath();
        ctx.moveTo(30,80);
        ctx.lineTo(10,110);
        ctx.stroke();
    }
    else if (incorrectGuesses === 3){
        ctx.beginPath();
        ctx.moveTo(30,40);
        ctx.lineTo(50,110);
        ctx.stroke();
    }
    else if (incorrectGuesses === 4){
        ctx.beginPath();
        ctx.moveTo(30,60);
        ctx.lineTo(10,500);
        ctx.stroke();
    }
    else if (incorrectGuesses === 5){
        ctx.beginPath();
        ctx.moveTo(30,60);
        ctx.lineTo(50,50);
        ctx.stroke();
    }
};
var drawUnderscores = function(howMany){
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (var i = 0; i < howMany; i++){
        ctx.moveTo((i * 30) + 10, 160);
        ctx.lineTo((i * 30) + 30, 160);
    }
    ctx.stroke();
};

var drawCorrectGuess = function(guess, index){
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(guess.toUpperCase(), (index * 30) + 10, 150);
};

var drawInCorrectGuess = function (guess, index){
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(guess.toUpperCase(), 380, (index * 20) + 40);
    ctx.moveTo(380, (index * 20) + 30);
    ctx.lineTo(400, (index * 20) + 30);
    ctx.stroke();
};

var word = pickWord();
var answerArray = setupAnswerArray(word);
var remainingLetters = word.length;
var incorrectGuesses = 0;

drawUnderscores(word.length);

while (remainingLetters > 0){
    showPlayerProgress(answerArray);
    var guess=getGuess();
    if (guess === null){
        break;
    } else if (guess.length !==1){
        alert("Пожалуйста введите одиночную букву.");
    } else {
        var correctGuesses = updateGameState(guess, word, answerArray);
        remainingLetters -= correctGuesses;
        if (correctGuesses === 0){
            drawSegment(incorrectGuesses);
            drawInCorrectGuess(guess, incorrectGuesses);
            incorrectGuesses++;
        }
    }
}
showAnswerAndCongratulatePlayer(answerArray);