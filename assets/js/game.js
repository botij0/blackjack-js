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
  console.log(deck)
  deck = _.shuffle(deck)
  console.log(deck)
}

initDeck();
