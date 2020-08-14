// Array of Deck of Card Images
const deckCards = ["Agility.png", "Agility.png", "Boat.png", "Boat.png", 
      "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", 
      "Nuka-Cola.png", "Nuka-Cola.png", "Robotics.png", "Robotics.png", "Shock.png", "Shock.png",
      "Agility.png", "Agility.png", "Boat.png", "Boat.png", 
      "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", 
      "Nuka-Cola.png", "Nuka-Cola.png"];

// Global Arrays

// Access the <ul> with class of .deck
const deck = document.querySelector(".deck");

//Create an empty array to store the opened cards
let opened = [];

//Create an empty array to store the matched cards
let matched = [];

//Access the model
const model = document.getElementById("model");

//Access the reset button
const reset = document.querySelector(".reset-btn");

//Access the play again button
const playAgain = document.querySelector(".play-again-btn");

//Select the class moves-counter and change it's HTML
const movesCount = document.querySelector(".moves-counter");



const timeCounter = document.getElementById("timeCounter");

//Create variable for moves counter, start the count at zero
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

let flipCount =0;
let unFlipcount = 0;
function shuffle(array) {
  let currentIndex = array.length - 1;
  let temporaryValue, randomIndex;

  while (currentIndex >=0) {

    randomIndex = Math.floor(Math.random()*currentIndex);
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    currentIndex--;
  }
  return array;
}

function startGame() {
    flipCount = unFlipcount =0;
  
  //Invoke shuffle function and store in variable
  const shuffledDeck = shuffle(deckCards);
  
  //Iterate over deck of cards array
  for (let i = 0; i<shuffledDeck.length; i++){

    // Create the <li> tags
    const liTag = document.createElement('LI');

    //Give <li> class of card
    liTag.classList.add('card');

    //Create the <img> tags
    const addImage = document.createElement('IMG');

    //Append <img> to <li>
    liTag.appendChild(addImage);

    //Set the img src path with the shuffled deck
    addImage.setAttribute("src", "images/" + shuffledDeck[i]);

    //Update the new <li> to the deck <ul>
    deck.appendChild(liTag);
  }
}

startGame();
function removeCard() {
    while (deck.hasChildNodes()) {
          deck.removeChild(deck.firstChild);
    }
}

function timer() {
    time = setInterval(function(){
      seconds++;

      if(seconds === 60){
        minutes++;
        seconds = 0;
      }

      if (minutes >=2) {
        resetEverything();
      }

      timeCounter.innerHTML = '<i class="far fa-hourglass-start"></i>' +
       "Timer: " + minutes + "Mins" + seconds + "secs";
    }, 1000);
}

function stopTime() {
  clearInterval(time);
}

function resetEverything() {
      stopTime();
      timeStart = false;
      seconds = 0;
      minutes = 0;
      timeCounter.innerHTML= '<i class="far fa-hourglass-start"></i>' + "Timer: 00:00";


      //Reset star count add the class back to show stars again

      star[1].firstElementChild.classList.add("fa-star");
      star[2].firstElementChild.classList.add("fa-star");
      starCount = 3;

      //Reset moves count and reset its inner HTML

      moves = 0;
      movesCount.innerHTML = 0;

      //Clear both arrays that hold the opened and matched cards

      matched = [];
      opened = [];

      //Clear the deck
      removeCard();

      //Create a new deck
      startGame();
}

function movesCounter() {
  movesCount.innerHTML ++;
  moves++;
}

function starRating(){
  if(moves === 14) {
    star[2].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
  if(moves === 18) {
    star[1].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
}

/*Compare two cards to see if they match or not*/
 function compareTwo() {
   //When there are 2 cards in the opened array
   if(opened.length===2){
     document.body.style.pointerEvents="none";
   }
   if(opened.length===2 && opened[0].src === opened[1].src){
     match();
 } else if (opened.length===2 && opened[0].src != opened[1].src){
    noMatch();
    }
 }

 function match() {
   setTimeout(function(){
     opened[0].parentElement.classList.add("match");
     opened[1].parentElement.classList.add("match");
     matched.push(...opened);
     document.body.style.pointerEvents="auto";
     winGame();
     opened=[];
   },600);

   movesCounter();
   starRating();
 }
 function noMatch() {
  setTimeout(function(){
    opened[0].parentElement.classList.remove("flip");
    opened[1].parentElement.classList.remove("flip");
    document.body.style.pointerEvents="auto";
    opened=[];
  },700);
  unFlipcount += 2;
  movesCounter();
  starRating();
 }

 function AddStats(){
   const stats = document.querySelector(".model-content");

   for(let i=1; i<= 3; i++){
      const statsElement = document.createElement("p");
      statsElement.classList.add("stats");
      stats.appendChild(statsElement);
   }
    
   let p = stats.querySelectorAll("p.stats");
   p[0].innerHTML = "Time to complete: "+ minutes + "Minutes and "+ seconds+"Seconds";
   p[1].innerHTML = "Moves Taken: "+ moves;
   p[2].innerHTML = "Your Star Rating is:" + starCount + "out of 3";
 }

 function displayModel() {
      const modelClose = document.getElementsByClassName("close")[0];
      model.style.display= "block";
      modelClose.onclick = function() {
        model.style.display = "none";
    };

    window.onclick = function(event) {
      if(event.target == model) {
        model.style.display = "none";
      }
    };
 }

 function winGame(){
      if(matched.length === deckCards.length) {
        stopTime();
        AddStats();
        displayModel();

      }
 }

 deck.addEventListener("click", function(evt){
   if(evt.target.nodeName === "LI"){
     console.log(evt.target.nodeName + "Was Clicked");
        if(timeStart === false){
          timeStart = true;
          timer();
        }
   flipCard();
 }
 
 function flipCard(){
      evt.target.classList.add("flip");
      addToOpened();
      flipCount++;
      
    }

  function addToOpened(){
      if(opened.length === 0 || opened.length === 1) {
        opened.push(evt.target.firstElementChild);
      }

      compareTwo();
  }
});

reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click', function(){
    model.style.display = "none";
    resetEverything();
});


