

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

// Shuffle and deal cards
function deal() {
  // List card icon css values
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
deal();

//event listening for card clicks
const deck = document.querySelector('.deck');
deck.addEventListener('click', respondToCardClick);

// Listener that will queue function stack
function respondToCardClick(evt) {
    console.log('card class: ' + evt.target.classList);
    disAble(evt);
    trackOpen(evt);
}

//Display icon
function showCard(evt) {
  evt.target.classList.toggle('show');
}

//Array of open cards
const open = [];

//Checks for dbl click before proceeding
function disAble(evt){
  if (evt.target.classList.contains('disabled')){
    console.log('double click');
  }
  else{
    evt.target.classList.toggle('disabled')
    showCard(evt);
    addOpen(evt);
  }
}

//Add icon to open card tracking.
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
  clearOpen();
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
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
