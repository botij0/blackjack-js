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

const initDeck = () => {
  for (let i = 1; i <= 13; i++){
    for (let suite of suites) {
      const val = specials[i] ? specials[i] : i
      deck.push(val + suite)
    }
  }
  deck = _.shuffle(deck)
}

initDeck();


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

console.log(cardValue('7D'))