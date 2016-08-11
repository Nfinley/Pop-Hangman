// Type the JS here

// HARD MODE: Organize your game code as an object, except for the key 
//events to get the letter guessed. This will be a challenge if you 
//haven't coded with JavaScript before, but we encourage anyone already 
//familiar with the language to try this out.
// Save your whole game and it's properties in an object.
// Save any of your game's functions as methods, and call them 
//underneath your object declaration using event listeners.
// Don't forget to place your global variables and functions above 
//your object.
// Remember: global variables, then objects, then calls.
// Definitely talk with a TA or your instructor if you get tripped up during this challenge.

// Intiialize the variables

//keyPress is from

//push to an array or pop which removes it
//use all of the getElementID, createElement, string character match
//Use regex (regular expression : regexr.com): very powerful for
//parsing text
//Global/contant variables should be VAR (capitalized)
// charAt which helps going through word to see if it is true
//Look at all elements we worked on in class on Monday

var game = {
    initialInput: true,
    masterAnswerArray: ['USHER', 'KILLERS', 'BEYONCE', 'SKRILLEX', 'PHOENIX', 'TIMBERLAKE', 'EMINEM',
        'RADIOHEAD', 'MGMT', 'BIEBER'
    ],
     // The word chosen by the computer at random
    initialPick: "",
    // This stores the current word pulled at random from the masterAnswerArray
    currentAnswerArray: [],
    // userGuess is the keystroke of the user
    userGuess: "",
    // correctGuess is set as boolean to track incorrect or correct guess state
    correctGuess: false,
    // correctGuessArray houses the correct user guess keystroke
    correctGuessArray: [],
    // this houses users incorrect guesses in an object
    incorrectGuessArray: [], //result of checking userGuess against currentMasterArray and if
    //it doesn't exist add to incorrectGuessArray
    incorrectGuessLimit: 15,
    wins: 0,
    losses: 0,
    updateHtml: function() {},
    randomPick: function() {
        return this.masterAnswerArray[Math.floor(Math.random() * this.masterAnswerArray.length)];
    },
    // console.log shortcut
    log: function(msg) {
        console.log(msg + "\n");
    },
    createGuessBlanks: function(id, array) {
        for (var i = 0; i < array.length; i++) {
            var insertDiv = $('<p>').attr('id', i).html("");
            $('#guessBlanks').append(insertDiv);

        }
    },
    convertKeyPress: function(keystroke) {
           return String.fromCharCode(keystroke.keyCode).toUpperCase();

    }
};


//Start by getting the page ready with document.ready
$(document).ready(function() {
    // puts an alert on the screen to tell the users to play
    //This ensure will ensure no user click counts as a guess
    $('#myModal').modal('show');
    game.log(this);
    
    // hide the modal to begin
    document.onkeyup = function(event) {

            //Condition if user hit any key 
            if (game.initialInput) {
                //hide the modal when user presses a key
                $('#myModal').modal('hide');
                //This stores a random string from masterAnswerArray into initial pick dynamically
                game.initialPick = game.randomPick();
                // logs the initial randomly selected word
                game.log("initial word: " + game.initialPick);

                // Take the initialPick string and turn it into an array of letters in currentAnswerArray
                game.currentAnswerArray = game.initialPick.split("");
                // logs the currentAnswerArray 
                game.log("currentAnswerArray: " + game.currentAnswerArray);

                // create the blank place holders for the word
                game.createGuessBlanks('#guessBlanks', game.currentAnswerArray);
                // logs 'guessblanks'
                game.log('#guessBlanks');

                game.initialInput = false;

            } else {
                //pull a random word from the masterAnswerArray
                game.userGuess = game.convertKeyPress(event);
                game.log("Keystroke is " + game.userGuess);

                // check the userGuess against the currentAnswerArray
                game.currentAnswerArray.forEach(function(letter, index){
                    // 
                    if(game.userGuess === letter) {
                        $('p#' + index).html(letter);
                        
                        game.correctGuess = true;

                    } else  if(!game.userGuess){
                        game.log("entered false else")
                       game.correctGuess = false;
                    }

                });
                // If this is called this means the user has selected an incorrect letter
                if(game.correctGuess == false){
                    if(game.incorrectGuessArray.indexOf(game.userGuess) == -1){
                        game.incorrectGuessArray.push(game.userGuess);
                        $('#incorrectGuesses').append(game.userGuess + "  ");
                        game.log("incorrectGuessArray: " + game.incorrectGuessArray);
                    }
                }else {
                    game.correctGuessArray.push(game.userGuess);
                    game.log("correctGuessArray: " + game.correctGuessArray);
                    }

            }



        }
        //displaying the computerguess and all tick spaces for guessed word
        //for each div  

    //
    // }



    // Placing the html into the game ID
    // document.querySelector('#game').innerHTML = html;


});


//Then the user guesses
// This will store the user clicks
// document.onkeyup = function(event) {
// 	//Match keyPress.match(/[a-z]/i) will make sure they only press a-z
// 	if(game.userGuess = 





// }

//SEE Belo for writing content to html
// Taking the tallies and displaying them in HTML


// var html = "<p>Press r, p or s to start playing</p>" +
// "<p>wins: " + 
// wins + 
// "</p>" +
// "<p>losses: " + 
// losses + 
// "</p>" +
// "<p>ties: " + 
// ties + 
// "</p>";
