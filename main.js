const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 500,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

function shuffle() {
  let positions = {}
  let available = ['a','b','c','d','e','f','g','h']

  function pickLetter(source) {
    const idx = Math.floor(Math.random() * source.length);
    const letter = source[idx]
    available = available.filter(item => item !== letter)
    return letter
  }

  // Bishops first  
  let letter = pickLetter(available);
  positions["bishop_white_1"] = letter + 1;
  positions["bishop_black_1"] = letter + 8;
  console.log("after bishop 1: ", positions)
  console.log("availale after bishop 1: ", available)

  // these squares are white respectively black on row 1
  const white_squares = ['a', 'c', 'e', 'g']
  const black_squares = ['b', 'd', 'f', 'h']
  let available_for_bishop_2 = []
  if (white_squares.includes(letter)) {
    available_for_bishop_2 = black_squares
  } else {
    available_for_bishop_2 = white_squares
  }

  letter = pickLetter(available_for_bishop_2)

  positions["bishop_white_2"] = letter + 1;
  positions["bishop_black_2"] = letter + 8;  

  // knights wherever
  let knight_1 = pickLetter(available)
  positions["knight_white_1"] = knight_1 + 1;
  positions["knight_black_1"] = knight_1 + 8;
  let knight_2 = pickLetter(available)
  positions["knight_white_2"] = knight_2 + 1;
  positions["knight_black_2"] = knight_2 + 8;
  
  // queen wherever
  let queen = pickLetter(available)
  positions["queen_white"] = queen + 1;
  positions["queen_black"] = queen + 8;

  // the king has to be in between the rooks
  let rook_1 = available.pop()
  positions["rook_white_1"] = rook_1 + 1
  positions["rook_black_1"] = rook_1 + 8

  let king = available.pop()
  positions["king_white"] = king + 1
  positions["king_black"] = king + 8

  let rook_2 = available.pop()
  positions["rook_white_2"] = rook_2 + 1
  positions["rook_black_2"] = rook_2 + 8

  return positions
}

let positions = shuffle()
console.log(positions)

for (let key in positions) {
  console.log(`${key}: ${positions[key]}`);
  const piece = document.getElementById(key);
  piece.style.gridArea = positions[key];
}
