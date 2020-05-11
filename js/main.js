
const suits = ['c', 'd', 'h', 's'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //1 - Ace, 11 - Jack, 12 - Queen, 13 - King

const deckOrdered = createOrderedDeck();
const deckShuffled = createShuffledDeck();
const playerHand = [];

class Card {
    constructor(suit, rank) {
        this.cardSuit = suit;
        this.cardRank = rank;
        this.flipped = true;
    }
};

function createOrderedDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push(new Card(suit, rank));
        })
    })
    return deck;
};


function createShuffledDeck() {
    const tempDeck = [...deckOrdered];
    shuffledDeck = [];
    while (tempDeck.length) {
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    };
    return shuffledDeck;
  };

function createStartingHand() {
    for(let i = 0; i < 5; i++) {
        console.log(deckShuffled[i]);
        playerHand.push(deckShuffled[i]);
    }
};

createStartingHand();


 