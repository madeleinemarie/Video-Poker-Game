
const suits = ['c', 'd', 'h', 's'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //1 - Ace, 11 - Jack, 12 - Queen, 13 - King



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
        console.log(deckShuffled[0]);
        playerHand.push(deckShuffled.shift());
    }
    console.log('Player Hand -----');
    console.log(playerHand);
    console.log('New deck, should be minus 5-----');
    console.log(deckShuffled);
};


const deckOrdered = createOrderedDeck();
const deckShuffled = createShuffledDeck();
const playerHand = [];
const sortedHand = [];
let payout = null;

document.getElementById("deal-five").addEventListener("click", createStartingHand);

console.log("Ordered Deck -------");
console.log(deckOrdered);
console.log("Shuffled Deck -------");
console.log(deckShuffled);

function handSort() { 
    playerHand.sort((a, b) => a.cardRank - b.cardRank); //sorts cards by rank for easier win checking
}

function checkWin() {
    //console.log("Inside checkwin");
    handSort();
    let isFlush = flushFlag();
    let isStraight = straightFlag();
    if(isFlush && isStraight) {
        let isRoyal = checkRoyal();
        if(isRoyal) {
                //set payout value
        } else {

        }
    } else {
    }
}

function flushFlag() { //checks if cards are all the same suit
    let suit = playerHand[0].cardSuit;
    for (let card of playerHand) {
        if (card.cardSuit != suit) {
            return false;
        }
    }
    return true;
};

function straightFlag() {
    let set = new Set(playerHand.map(item => item.cardRank));
    if(set.size !== 5){     //checks if all card ranks are different
        return false;
    }
    let firstRank = playerHand[0].cardRank;
    let lastRank = playerHand[4].cardRank;
    return (lastRank - firstRank) == 4;
};

function checkRoyal() {
    royalArr = [1, 10, 11, 12, 13];
    rankArr = playerHand.map(item => item.cardRank);
    console.log(rankArr);
    for (let i = 0; i < royalArr.length; i++) {
        if (royalArr[i] !== rankArr[i]) {
            return false;
        } 
    }
    return true;
};

