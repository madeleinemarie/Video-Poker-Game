
const suits = ['c', 'd', 'h', 's'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,] //1 - Ace, 11 - Jack, 12 - Queen, 13 - King

class Card {
    constructor(suit, rank) {
        this.cardSuit = suit;
        this.cardRank = rank;
        this.flipped = true;// (images are named 01.jpg, 02.jpg, etc.
    }
}

function createOrderedDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push(new Card(suit, rank));
        })
    })
    return deck;
}

const deckOrdered = createOrderedDeck();
console.log(deckOrdered);

// 1. Create a new deck of all 52 cards

//      A. Loop through all suits
//      B. Within each suit, loop through all ranks (1-13)
//          b1. Create a new Card object by passing in the indices from both for loops, store new Card object in variable for next step.
//          b2. Push new card object into deckOrdered array

// 2. Five random cards from the deck are displayed as the player’s hand
//      A. Shuffle the card deck
//          a1. Reorder the array with some logic I haven’t quite figured out (sort() and Math.random?)
//          a2. Store shuffled card deck into deckShuffled(?)
//      B. Loop through first five cards in shuffled deck
//          b1. Create img element 
//          b2. Set img’s src attribute to corresponding jpg within current loop’s card object
//          b3. Set img’s data-id to the current value of the cardsDealt counter
//          b4. Add event listener for click (will run the function that selects cards to discard)
//          b5. Increment a global variable called cardsDealt
//          b6. Add card to cardsInHand array
//          b7. Append img element as child to the game board

// //Listen for bet (ice box)

// 3. Listen for either the Stand button to be clicked, the Draw button to be clicked, or for any card on the card table to be clicked
//      A. If the Stand button is pushed, skip to step 5.
//      B. If a card is clicked, perform the following:
//          b1. Retrieve the card img’s data-id and push that number into the cardsToDiscard array
//          b2. Update the card’s src to the image of the back of a card
//          b3. Run the flip function, which changes the src of the card to the image of the back of the card if flipped = true, and changes it back to the front of the card if flipped = false, switching the boolean each time
//      C. If Draw button is clicked, perform the following:
//          c1. Check to see if any cards are in the cardsToDiscard array before c2
//              -If not, alert user that you must discard at least 1 card to draw, then return
//          c2. Skip to step 4

// 4. Deal additional cards based on number that were discarded
//      A. Check length of cardsToDiscard array
//          a1. Create a new img element (as seen in step 2B) to replace each flipped card
//          a2. Remove img elements that have been flipped, append new img elements in their place 	// how to identify the position of flipped/discarded cards?

// 5. Check cards in cardsInPlay against win condition logic
//      A. Check rank of cards first
//          a1. if it meets certain conditions then check for royal flush, flush, and straight flush
//      B. Check for three of a kind, four of a kind, full house, two pair, straight, and jacks or better
//      C. If a win condition is met, display name of win condition, else display “Bust”
//      D. Remove buttons for Stand and Draw, replace with Play Again button
//          d1. Add event listener to play again button, which if clicked will remove all child nodes from board, create new deck, run draw function again, and reset all cached variables

