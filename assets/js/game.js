/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const suites = ['C', 'D', 'H', 'S'];
const specials = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K'
}

let playerPoints = 0, computerPoints = 0;

// DOM References
const title = document.querySelector('header')

const btnDeal = document.querySelector('#btnDeal');
const btnEnd = document.querySelector('#btnEnd');
const btnNew = document.querySelector('#btnNew');

const playerScore = document.querySelector('#player-container').querySelector('small');
const computerScore = document.querySelector('#computer-container').querySelector('small');

const playerCards = document.querySelector('#player-cards');
const computerCards = document.querySelector('#computer-cards');

const initDeck = () => {
  deck = []
  for (let i = 1; i <= 13; i++){
    for (let suite of suites) {
      const val = specials[i] ? specials[i] : i
      deck.push(val + suite)
    }
  }
  deck = _.shuffle(deck)
}

const dealCard = () => {
  if (deck.length === 0) {
    throw 'No remain cards in deck'
  }
  return deck.pop()
}

const cardValue = (card) => {
  const num = card.substring(0, card.length - 1);
  return !isNaN(num) ? Number(num) : num === 'A' ? 11 : 10;
  // Number(x) is equivalent to x * 1
}


const handleTurn = (points, scoreDom, cardsDom) => {
  const card = dealCard();
  points += cardValue(card);
  scoreDom.innerText = points;

  const newCardImg = document.createElement('img');
  newCardImg.src = `assets/cards/${card}.png`;
  newCardImg.classList.add('card');
  cardsDom.append(newCardImg);
  return points
}

const newGame = () => {
  initDeck();

  title.innerText = "Blackjack";

  playerPoints = 0
  playerScore.innerText = 0
  playerCards.innerHTML = ''

  computerPoints = 0
  computerScore.innerText = 0
  computerCards.innerHTML = ''

  btnDeal.disabled = false;
  btnEnd.disabled = false;
}


// Computer Turn

const turnComputer = (minPoints) => {
  do {
    computerPoints = handleTurn(computerPoints, computerScore, computerCards);
  } while (computerPoints < minPoints && minPoints <= 21);

  if (computerPoints === minPoints) {
    title.innerText = "Draw"
    return
  }

  if (computerPoints <= 21) {
    title.innerText = "Computer won";
    return
  }

  title.innerText ="Player Won";
}

const endTurn = () => {
  btnDeal.disabled = true;
  btnEnd.disabled = true;
  turnComputer(playerPoints);
}


// Events
btnDeal.addEventListener('click', () => {
  playerPoints = handleTurn(playerPoints, playerScore, playerCards);
  if (playerPoints < 21){return}
  endTurn();

});

btnEnd.addEventListener('click', () => {
  endTurn();
})

btnNew.addEventListener('click', () => {
  newGame();
})

newGame();