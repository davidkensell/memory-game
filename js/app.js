// Shared tracking variables
const open = []; // Open cards, where "open" is a flipped unmatched card
let moves = 0; // Number of moves made, where each flipped card is a move
let matched = 0; // Number of matches, where a pair equals 1
var timerId; // Game clock needs to be accessible by start and stop functions

// Begin game on page load
deal();

// Shuffle and deal cards
function deal() {
  // Card icons css values
  let icons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
  // Shuffle
  icons = shuffle(icons);
  console.log(icons);
  // Insert shuffled icons
  const cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++){
    cards[i].firstElementChild.classList.add(icons[i]);
    console.log(cards[i]);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Event listening for card clicks
const deck = document.querySelector('.deck');
deck.addEventListener('click', respondToCardClick);

// Listener that will queue function stack
function respondToCardClick(evt) {
    console.log('card class: ' + evt.target.classList);
    disAble(evt);
    trackOpen(evt);
}

// restart
const restart = document.querySelector('.restart');
restart.addEventListener('click', reStart);

function reStart(){
  const cards = document.querySelectorAll('.card');
  // remove card status classes
  for (let i = 0; i < cards.length; i++){
    cards[i].classList.remove('show', 'open', "mismatch", "disabled", "match");
  }
  // remove card icons
  for (let i = 0; i < cards.length; i++){
    let current = cards[i].firstElementChild.classList.item(1);
    cards[i].firstElementChild.classList.remove(current);
  }
  // reset open counter, move counter, and then redeal icons
  open.length = 0;
  matched.length = 0;
  resetCounter();
  deal();
}

// Display icon on card click
function showCard(evt) {
  evt.target.classList.toggle('show');
}

// Checks for dbl click before proceeding
function disAble(evt){
  if (evt.target.classList.contains('disabled')){
    console.log('double click');
  }
  else{
    evt.target.classList.toggle('disabled')
    showCard(evt);
    addOpen(evt);
    moveCounter();
    starScore();
  }
}

// Count number of moves
function moveCounter(){
  const counter = document.querySelector('.moves');
  moves++;
  counter.textContent = moves;
}

// Reset moves to zero
function resetCounter(){
  const counter = document.querySelector('.moves');
  moves = 0;
  counter.textContent = moves;
}

// Remove stars as moves increase
function starScore(){
  const star1 = document.querySelector('#star1');
  const star2 = document.querySelector('#star2');
  const star3 = document.querySelector('#star3');

  let full = "fa-star";
  let half = "fa-star-half-empty";
  let none = "fa-star-o";

  if (moves === 16){
    star3.classList.replace(full, half);
  }
  if (moves === 20){
    star3.classList.replace(half, none);
  }
  if (moves === 25){
    star2.classList.replace(full, none);
  }
  if (moves === 30){
    star2.classList.replace(half, none);
  }
  if (moves === 35){
    star1.classList.replace(full, half);
  }
  if (moves === 40){
    star1.classList.replace(half, none);
  }
}

// Add icon to open card tracking.
function addOpen(evt) {
  let icon = evt.target.firstElementChild.classList.item(1);
  //add icon
  open.push(icon);
  console.log('icon: ' + icon);
  console.log('open: ' + open);
  //toggle card class
  evt.target.classList.toggle('open');
}

// Check to see if open cards match
function trackOpen(evt) {
  if (open.length === 2) {
    if ((open[1]) === (open[0])){
      console.log('card match ran');
      return cardMatch();
    }
    else {
      console.log('clear open ran');
      return misMatch();
    }
  }
}

// Mark matched cards
function cardMatch(){
  let matches = document.querySelectorAll('.open');
  matches[0].classList.add('match');
  matches[1].classList.add('match');
  matched++;
  console.log("matched " + matched);
  clearOpen();

  if (matched === 8) {
    stopWatch();
    gameOver();
  }
}

// Display mismatches red for one sec, then clear
function misMatch(){
  let mismatches = document.querySelectorAll('.open');
  mismatches[0].classList.add('mismatch');
  mismatches[1].classList.add('mismatch');
  setTimeout(clearOpen, 1000);
}

// Clear opened cards css and from tracking array
function clearOpen(){
  let opens = document.querySelectorAll('.open');
  for (let i = 0; i < opens.length; i++){
    opens[i].classList.remove('show', 'open', "mismatch", "disabled");
    open.length = 0;
  }
}

// Start game clock, guided by https://javascript.info/settimeout-setinterval
function startWatch() {
  const timer = document.querySelector(".timer");
  let m = 0;
  let s = 0;

  timerId = setInterval(function() {
    timer.textContent = (m + ' min ' + s + ' sec');
    s++;
    if (s == 60){
      m++;
      s = 0;
    }
    console.log(m + ' min ' + s + ' sec')
  }, 1000);
}

// Stop game clock
function stopWatch() {
  clearInterval(timerId);
}

// Game Over! Toggle modal when matched = 8
function gameOver(){
  
}
