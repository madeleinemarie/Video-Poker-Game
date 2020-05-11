
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

