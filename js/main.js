
class Card {
    constructor(suit, rank) {
        this.cardSuit = suit;
        this.cardRank = rank;
        this.flipped = false;
    }
};

const suits = ['c', 'd', 'h', 's'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //1 - Ace, 11 - Jack, 12 - Queen, 13 - King


let deckOrdered = [];
let deckShuffled = [];
const playerHand = [];
const cardsToDiscard = [];
//const sortedHand = []; //don't think I need this -- sorting happens when checking win
let bankBalance = 100;
let payout = null;

const message = document.getElementById('message');
const standButton = document.getElementById('stand-btn');
const drawButton = document.getElementById('draw-btn');




function init() {
    deckOrdered = createOrderedDeck();
    deckShuffled = createShuffledDeck();
    document.getElementById("deal-five").addEventListener("click", createStartingHand);
    drawButton.addEventListener("click", drawCards); //testing purposes
    message.innerHTML = "Place your bet!";
    drawButton.disabled = true;
}

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
    renderHand();
};

function renderHand() {
    for (let i = 0; i < playerHand.length; i++){
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/facetest.svg');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-table').appendChild(cardElement);
	}
}

function flipCard(e) {
    //console.log("flipCard called");
    //console.log(playerHand[e.target.getAttribute('data-id')]);
    let isFlipped = playerHand[e.target.getAttribute('data-id')].flipped;
    isFlipped = !isFlipped;

    playerHand[e.target.getAttribute('data-id')].flipped = isFlipped;
    
    //console.log(isFlipped); 
    if (isFlipped) {
        e.target.setAttribute('src', 'images/blueback.svg');
        cardsToDiscard.push(playerHand[e.target.getAttribute('data-id')]);
        //cardsToDiscard[playerHand[e.target.getAttribute('data-id')]].position = playerHand[e.target.getAttribute('data-id')];
        drawButton.disabled = false;
    } else {
        e.target.setAttribute('src', 'images/facetest.svg');
    }
    //e.target.src = 'images/facetest.svg'; //e vs e.target?
    console.log(e);
    console.log(e.target);    
    console.log(playerHand);
}

function drawCards() {
    console.log("draw was clicked");
    playerHand.forEach(function (card) {
        if (card.flipped = true) {
            
        }
    })
}

function sortHand() { 
    playerHand.sort((a, b) => a.cardRank - b.cardRank); //sorts cards by rank for easier win checking
}

function checkWin() {
    //console.log("Inside checkwin");
    sortHand();
    let isFlush = flushFlag();
    let isStraight = straightFlag();
    if(isFlush && isStraight) {
        let isRoyal = checkRoyal();
        if(isRoyal) {
            payout = 1;
        } else {
            payout = 8;
        }
    } else if (isFlush){
        payout = 6;
        
    } else if(isStraight) {
        payout = 7;
    } else {
        checkOtherHands();
    }
};


function flushFlag() { 
    let suit = playerHand[0].cardSuit;
    for (let card of playerHand) {
        if (card.cardSuit != suit) {     //checks if cards are all the same suit
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

function checkOtherHands() {
    let counts = {};
    playerHand.forEach(function(singleCard) {
        let singleRank = singleCard.cardRank;
        counts[singleRank] = counts[singleRank] ? counts[singleRank] + 1 : 1;
    });
    if (Object.values(counts).includes(4)) { // Four of a Kind
        payout = 4;
    } else if (Object.values(counts).includes(2) && Object.values(counts).includes(3)) { // Full House
        payout = 5;
    } else if (Object.values(counts).includes(3)) { // Three of a Kind
        payout = 3;
    } else if (Object.values(counts).filter(item => item == 2).length == 2) { // Two Pairs
        payout = 2;
    } else {
        payout = 0;
    }
};

function runPayout(winNum) {

}

init();

console.log("Ordered Deck -------");
console.log(deckOrdered);
console.log("Shuffled Deck -------");
console.log(deckShuffled);
