
class Card {
    constructor(suit, rank) {
        this.cardSuit = suit;
        this.cardRank = rank;
        this.flipped = false;
    }
};

const suits = ['c', 'd', 'h', 's'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //1 - Ace, 11 - Jack, 12 - Queen, 13 - King
const payoutInfo = [ 
    {
        winName: "Bust", 
        pay: 0
    },
    {
        winName: "Royal Flush", 
        pay: 250
    },
    {
        winName: "Two Pair", 
        pay: 2
    },
    {
        winName: "Three of a Kind", 
        pay: 3
    },
    {
        winName: "Four of a Kind", 
        pay: 25
    },
    {
        winName: "Full House", 
        pay: 9
    },
    {
        winName: "Flush", 
        pay: 6
    },
    {
        winName: "Straight", 
        pay: 4
    },
    {
        winName: "Straight Flush", 
        pay: 50
    }
 ];

let deckOrdered = [];
let deckShuffled = [];
let playerHand = [];
let bankBalance = 100;
let bet = 0;
let payout = null;

const message = document.getElementById('message');
const standButton = document.getElementById('stand-btn');
const drawButton = document.getElementById('draw-btn');
const gameTable = document.getElementById('game-table');
const bankDisplay = document.getElementById('bank-balance');
const currentBet = document.getElementById('bet-num');
const betMinusBtn = document.getElementById('bet-minus');
const betPlusBtn = document.getElementById('bet-plus');
const dealBtn = document.getElementById('deal-btn');
const newGameBtn = document.getElementById('newgame-btn');
const betDisplay = document.getElementById('bet-table');

function init() {
    deckOrdered = createOrderedDeck();
    deckShuffled = createShuffledDeck();
    dealBtn.addEventListener('click', createStartingHand);
    drawButton.addEventListener('click', drawCards); 
    betMinusBtn.addEventListener('click', betDecrement);
    betPlusBtn.addEventListener('click', betIncrement);
    standButton.addEventListener('click', drawCards);
    bankDisplay.innerHTML = bankBalance + '<img src="images/coin.png">';
    message.innerHTML = 'Place your bet!';
    //message.addClass('blink');
    currentBet.innerHTML = bet;
    drawButton.disabled = true;
    betMinusBtn.disabled = true;
    dealBtn.disabled = true;
    standButton.disabled = true;
    renderCardBacks();
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
    clearTable();
    message.innerHTML = ".................."
    bankBalance -= bet;
    bankDisplay.innerHTML = bankBalance + '<img src="images/coin.png">';
    for(let i = 0; i < 5; i++) {
        playerHand.push(deckShuffled.shift());
    }
    dealBtn.disabled = true;
    standButton.disabled = false;
    betPlusBtn.disabled = true;
    betMinusBtn.disabled = true;
    renderHand();
};

function renderCardBacks() {
    for (let i = 0; i < 5; i++){
		let cardBackElement = document.createElement('img');
		cardBackElement.setAttribute('src', 'images/blueback.svg');
		gameTable.appendChild(cardBackElement);
	}
};

function renderHand() {
    for (let i = 0; i < playerHand.length; i++){
        imgPath = 'images/' + playerHand[i].cardSuit + playerHand[i].cardRank + '.svg';
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', imgPath);
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		gameTable.appendChild(cardElement);
	}
};

function betDecrement() {
        bet--;
    if (bet < 1) {
        betMinusBtn.disabled = true;
        dealBtn.disabled = true;
    }
    if (bet > 0){
        betPlusBtn.disabled = false;
    }
    currentBet.innerHTML = bet;
};

function betIncrement() {
    bet++;
    dealBtn.disabled = false;
    if (bet > 4) {
        betPlusBtn.disabled = true;
    }
    if (bet > 0) {
        betMinusBtn.disabled = false;
    }
    currentBet.innerHTML = bet;
};

function clearTable() {
    while(gameTable.hasChildNodes()){
        gameTable.removeChild(gameTable.lastChild);
    }
};

function flipCard(e) {
    let isFlipped = playerHand[e.target.getAttribute('data-id')].flipped;
    if(!isFlipped) {
        playerHand[e.target.getAttribute('data-id')].flipped = true;
        e.target.setAttribute('src', 'images/blueback.svg');
        drawButton.disabled = false;
    }
    standButton.disabled = true;
};

function drawCards() {
    for(i = 0; i < playerHand.length; i++) {
        if (playerHand[i].flipped === true) {
            newCard = deckShuffled.shift();
            playerHand.splice(i, 1, newCard);
        };
    }
    clearTable();
    renderHand();
    checkWin();
};

function sortHand() { 
    playerHand.sort((a, b) => a.cardRank - b.cardRank);
};

function checkWin() {
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
    disableFlip();
    runPayout(payout);
};

function disableFlip() {
    let children = gameTable.childNodes;
    let childArr = Array.from(children);
    childArr.forEach(function(child) {
        child.removeEventListener('click', flipCard);
    })
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
    message.innerHTML = payoutInfo[winNum].winName + '! You won ' + payoutInfo[winNum].pay * bet + '<img src="images/coin.png">';
    bankBalance += payoutInfo[winNum].pay * bet;
    bankDisplay.innerHTML = bankBalance + '<img src="images/coin.png">';
    endGame();
};

function endGame() {
    toggleButtons();
    newGameBtn.addEventListener('click', newGame);
};

function newGame(){
    bet = 0;
    payout = null;
    deckOrdered = [];
    deckShuffled = [];
    playerHand = [];
    betMinusBtn.disabled = false;
    betPlusBtn.disabled = false;
    toggleButtons();
    clearTable();
    init();
};

function toggleButtons() {
    newGameBtn.classList.toggle("hide");
    dealBtn.classList.toggle("hide");
    drawButton.classList.toggle("hide");
    //betDisplay.classList.toggle("hide");
    standButton.classList.toggle("hide");
};

init();
