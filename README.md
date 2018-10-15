# memory-game

## Dependencies
None. No jquery, no bootstrap, nada.

## Gameplay
It's Classic Concentration: you know the deal. Click a card to flip it, then find its match; matches stay flipped, mismatches are flipped back over. Match cards in as few moves as you can, as fast as you can. The more moves it takes, the lower your star rating will be. Restart at any time by clicking the icon that looks like a refresh symbol in the score bug.

## How it works

### Cards
Icons are shuffled randomly on start and restart and distributed to HTML cards by changing CSS class. All modifications to cards throughout game (open, matched, mismatch) are done by CSS. There is no additional HTML created via JS.

### Flow
All card clicks go through a "disAble" function to check for double clicks, clicks of matched cards, etc. It's the biggest and most important gate. If a card passes, it gets disabled added to its class, gets added to a list of "open" cards, and several other functions are invoked.  

### Trackers
Opened cards, number of moves, and number of matches are counted and trigger other actions.
