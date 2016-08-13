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

/* TO DO: 
    1. 
    2. add additional correct and incorrect sounds
    3. create a button after the win to play again
    -add images to win names
    3. Then to figure out how to add the video after a win and replace existing
    3. The win sound also happens after click ok on alert box - check this.
    5. Add the video or image and soung to play at the end (maybe create an object to store the association between the videos and the word)
    6. Dynamically update all html using Javascript instead of jQuery - replace all curreny jQuery with Javascript
    7. Validate all code
    8. Fix the blank line issue
   
    
*/

// The object that stores all of the game variables and functions
var game = {
    initialInput: true,
    masterAnswerArray: ['USHER', 'KILLERS', 'BEYONCE', 'SKRILLEX', 'PHOENIX', 'TIMBERLAKE', 'EMINEM',
        'RADIOHEAD', 'MGMT', 'BIEBER'
    ],
    // Object stores the video links and string association
    masterVideoClips :{ 'USHER': '', 'KILLERS': '', 'BEYONCE': 'https://www.youtube.com/watch?v=4m1EFMoRFvY', 'SKRILLEX': '', 'PHOENIX': '', 'TIMBERLAKE':'', 'EMINEM': '',
        'RADIOHEAD': '', 'MGMT': '', 'BIEBER':''},

// stores the link to the correct guess sound
    correctAudioLinkArray: ['assets/audio/victoryismine.mp3', 'assets/audio/whahey.mp3'],

    // The word chosen by the computer at random from the masterAnswerArray
    initialPick: "",

    // currentAnswerArray stores the current word pulled at random from the masterAnswerArray
    currentAnswerArray: [],

    //alternate array is a clone of current answer array but will become only unique letters of current answer array later on
    alternateAnswerArray: [],

    // userGuess is the keystroke of the user
    userGuess: "",

    // correctGuessArray houses the correct user guess keystrokes
    correctGuessArray: [],

    // incorrectGuessArray houses users incorrect guesses in an array
    incorrectGuessArray: [],

    //This is the inial number of incorrect guesses alloted for each word play 
    incorrectGuessLimit: 8,

    // This is initializes the count for the number of unique letters in
    uniqueLettersInAnswer: 0,

    // // sets the boolean value to false for whether the user selects the right key(may not want to store this here)
    haveGuessedCorrectLetter: false,

    // This stores the types of user clicks in a variable called alphaRequirement. Will only allow letters.
    alphaRequirement: /^[A-z]+$/,

    // initializes the wins to zero
    wins: 0,
    // initializes the losses to zero
    losses: 0,

    updateHtml: function() {},
    // This funtion picks our random word from the masterAnswerArray
    randomPick: function() {
        return this.masterAnswerArray[Math.floor(Math.random() * this.masterAnswerArray.length)];
    },

    correctSoundPick: function () {
        return this.correctAudioLinkArray[Math.floor(Math.random() * this.correctAudioLinkArray.length)];
    },

    // console.log shortcut
    log: function(msg) {
        console.log(msg + "\n");
    },
    // this function creates the blank spaces at the beginning of the game
    createGuessBlanks: function(id, array) {
        for (var i = 0; i < array.length; i++) {
            var insertDiv = $('<p>').attr('id', i).html("");
            $('#guessBlanks').append(insertDiv);

        }
    },
    // this function converts the user keystroke to uppercase
    convertKeyPress: function(keystroke) {
        return String.fromCharCode(keystroke.keyCode).toUpperCase();

    },


    // this function initializes the unique count in the 
    countUniqueLettersInArray: function(arrayOfLetters) {
        return $.unique(arrayOfLetters).length;
        // var i = arrayOfLetters.length;
        // return i;

    },
    // This is the game start function that is recalled in the beginning and after correct guess
    gameStart: function(){
            $('#guessBlanks').empty();
            $('#incorrectGuesses').empty();
            // $('#guessesRemaining').html('');
            
            game.initialPick = "";
            game.userGuess = [];
            game.incorrectGuessArray =[];
            game.incorrectGuessLimit = 8;
            game.correctGuessArray = [];
            $('#guessesRemaining span').html(game.incorrectGuessLimit);
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

            // log all of the words still in the master array
            game.log("masterAnswerArray: " + game.masterAnswerArray);

            // initializes the clone of current answer in order to ensure separate memory storage for recall later
            game.alternateAnswerArray = game.initialPick.split("");

            // create the blank place holders for the word
            game.createGuessBlanks('#guessBlanks', game.currentAnswerArray);
            // logs 'guessblanks + the current word'
            game.log('#guessBlanks on html page: ' + game.currentAnswerArray);

    }
    // generates a random correct sound
    // getCorrectSound: function() {
    //     return this.correctAudioLinkArray[Math.floor(Math.random() * this.correctAudioLinkArray.length)];
    // }

    // onkey up stored as a function
    // beginGamePlay: function(event){
    // document.onkeyup(event)
    // }
};

/* STAGE 1: Set up the browser to display the initial game components.
Start by getting the page ready with document.ready */
$(document).ready(function() {
    /*This puts a model  on the screen to tell the users to click any key to begin
    This ensures that the first user click will not count as a guess */
    $('#myModal').modal('show');

    game.log(this);


    // This function captures the users keystrokes
    document.onkeyup = function(event) {

        //Callin the boolean value of true and it is true when the user hits a keystroke
        if (game.initialInput) {
            game.gameStart();


            game.initialInput = false;

            // STAGE 2: GAME PLAY BEGINS
        } else {
            // this converts the user guess into the uppercase string
            game.userGuess = game.convertKeyPress(event);
            game.log("The User Guess is: " + game.userGuess);

            // logs the user keystroke
            game.log("Keystroke is " + game.userGuess);
            // use .test to ensure nothing but a-z is pressed  and throw alert if anything else is pressed
            if (!game.alphaRequirement.test(game.userGuess)) {
                alert("You can only choose letters, silly!");
                return false;
            }
            // intiliaze the condition of looking for a correct guessed letter
            game.haveGuessedCorrectLetter = false;
            game.log("current answer array: " + game.currentAnswerArray);
            // Loop to check the userGuess against the currentAnswerArray
            game.currentAnswerArray.forEach(function(letter, index) {
                // If to see if the user guess is true
                if (game.userGuess === letter) {
                    // if user guess is true it writes the letter to screen
                    // re write this using javascript ###########
                    $('p#' + index).html(letter);

                    // creates an audio element and plays a sound when guessing correct letter
                    var audioElementRight = document.createElement('audio');
                    audioElementRight.setAttribute('src', game.correctSoundPick());
                    audioElementRight.play();
                    game.log("Victory is mine has just played");
                    // if the guess is incorrect this statement is true and it keepsl looping
                    game.haveGuessedCorrectLetter = true;

                //don't thnk I need this else statement only used if for tesing
                // } else {
                //     game.log("entered false else");

                }

            });
            // If this is called this means the user has selected an incorrect letter
            if (game.haveGuessedCorrectLetter == false) {
                if (game.incorrectGuessArray.indexOf(game.userGuess) == -1) {
                    game.incorrectGuessArray.push(game.userGuess);
                    $('#incorrectGuesses').append(game.userGuess + "  ");
                    game.log("incorrectGuessArray: " + game.incorrectGuessArray);
                    // put counter for incorrect guesses
                    // this decreases the guess limit by one for every incorrect guess
                    game.incorrectGuessLimit -= 1;
                    game.log("Guesses Remaining: " + game.incorrectGuessLimit);
                    // replaces existing html with new incorrect guess limit using Javascript
                    document.querySelector('#guessesRemaining span').innerHTML = game.incorrectGuessLimit;
                    
                    // dynamically updating guesses remaining using jQuery 
                    // $('#guessesRemaining span').text(game.incorrectGuessLimit);
                    // When a letter is guessed wrong a sound plays
                    var audioElementWrong = document.createElement('audio');
                    audioElementWrong.setAttribute('src', 'assets/audio/ohcrap.mp3');
                    audioElementWrong.play();
                    game.log("wong answer");
                }
            } else {
                // This will give unique true letter guesses
                if (game.correctGuessArray.indexOf(game.userGuess) == -1) {
                    game.correctGuessArray.push(game.userGuess);
                    game.log("correctGuessArray: " + game.correctGuessArray);
                }

            }

            // This is the unique letters in the alternate answer array (the unique clone of current answer array)
            game.uniqueLettersInAnswer = game.countUniqueLettersInArray(game.alternateAnswerArray);
            game.log("Current value of unique letters in Answer: " + game.uniqueLettersInAnswer);
            game.log("Current value of countUniqueLettersInArray: " + game.countUniqueLettersInArray(game.alternateAnswerArray));

            // If unique letters from the answer array == length of correct guess array, 
            // Then round is over . Note no need to run unique function over correct guess array
            // as it is already taken care of. 
            if (game.correctGuessArray.length == game.uniqueLettersInAnswer) {
                alert("You have guessed the correct word!"); //This will be substituted for
                game.log("Correctly Guessed Word: " + game.currentAnswerArray);
                // This is when the game is over 

                // Update the win count using Javascript
                game.wins++;
                document.querySelector('#wins span').innerHTML = game.wins;
                
                game.log("The current number of wins is: " + game.wins)
                
                // Put up a video that ties the correct guess on the screen
                //Use current answer array to look into videoClips array to find a match and then use 
                // maseterVideoClips.correctVideoClip
                // var correctVideoClip = game.masterVideoClips.indexOf(game.currentAnswerArray);
                // game.log("Video clip should equal eachother: " + correctVideoClip + ' ' + currentAnswerArray);
                // var playVideo = document.createElement('iframe');
                //     playVideo.setAttribute('src', 'game.masterVideoClips.correctVideoClips');
                //     playVideo.play();
                // Also need to insert the video and autoplay
                // Dynamically

                // the .splice function removes an element from an array. The '1' within the function refers to how many indexes to pull
                var removeIndex = game.masterAnswerArray.indexOf(game.initialPick);
                if (removeIndex != 1) {
                    game.masterAnswerArray.splice(removeIndex, 1);
                    game.log("masterAnswerArray should have been altered! It is now: " + game.masterAnswerArray);
                }

                // If nothing left in master array game is over, throw an alert or awesome fullscreen image (z-indez 1000, gif)
                // if(){

                // }

                // If something left in master array choose another word to play and re-initialize 
                if(game.masterAnswerArray.length > -1){
                    game.gameStart();
                    game.log("Entered game reset areaup");

                    };
                
                // To re-initialize call up the document.onkeyup event


                // Where user has no correct guesses left
            } else if (game.incorrectGuessLimit == 0) {
                alert("YOU LOSE!");

                // This updates the loss count using Javascript
                game.losses++;
                document.querySelector('#losses span').innerHTML = game.losses;

                // If completly gets this wrong re-initialize without removing the word from master array
                if(game.masterAnswerArray.length > -1){
                    game.gameStart();
                    game.log("Entered game reset areaup");

                    };
            }

        }
        // STAGE 3: End of game play - reset for new game
        // removes current answer just played from master array  - remove initialPick from MasterArray
        // var removeIndex = game.masterAnswerArray.indexOf(game.initialPick);
        // game.log('line 236: intial pick: ' + game.initialPick)
        // if (removeIndex > -1) {
        //     game.masterAnswerArray.splice(removeIndex);
        //     game.log("line 239: " + game.masterAnswerArray + removeIndex);
        // }
        // Pull the initialPick string out of the master array
        // var removeIndex = game.masterAnswerArray.indexOf(game.initialPick);
        // (removeIndex != -1) ? game.masterAnswerArray.splice(removeIndex): alert("Fatal System Error: initialPick not found!");
        // game.log("masterAnswerArray should have been altered! It is now: " + game.masterAnswerArray);
        // Remove the current word so that it cannot be guessed again

        // .splice(game.initialPick, 1);
        // game.log("masterAnswerArray should have been altered! It is now: " + game.masterAnswerArray);



    }

});

