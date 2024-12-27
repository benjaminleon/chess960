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

  // knights goes wherever
  let knight_1 = pickLetter(available)
  positions["knight_white_1"] = knight_1 + 1;
  positions["knight_black_1"] = knight_1 + 8;
  let knight_2 = pickLetter(available)
  positions["knight_white_2"] = knight_2 + 1;
  positions["knight_black_2"] = knight_2 + 8;
  
  // queen goes wherever
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

function move(pieceID, targetSquareId) {
  const piece = document.getElementById(pieceID);
  const targetSquare = document.getElementById(targetSquareId);

  if (piece && targetSquare) {
    targetSquare.appendChild(piece);
    console.log(`Moved ${pieceID} to ${targetSquareId}`);
  } else {
    console.error(`Element not found: king=${piece}, targetSquare=${targetSquare}`);
  }
}

async function delayedMove(piece, targetSquare) {
  move(piece, targetSquare);
  await new Promise(r => setTimeout(r, 100));
}

async function generate() {
  // Get the pieces off the board to avoid collisions
  await delayedMove('rook_black_1', 'a9');
  await delayedMove('knight_black_1', 'b9');
  await delayedMove('bishop_black_1', 'c9');
  await delayedMove('queen_black', 'd9');
  await delayedMove('king_black', 'e9');
  await delayedMove('bishop_black_2', 'f9');
  await delayedMove('knight_black_2', 'g9');
  await delayedMove('rook_black_2', 'h9');

  await delayedMove('rook_white_2', 'h0');
  await delayedMove('knight_white_2', 'g0');
  await delayedMove('bishop_white_2', 'f0');
  await delayedMove('king_white', 'e0');
  await delayedMove('queen_white', 'd0');
  await delayedMove('bishop_white_1', 'c0');
  await delayedMove('knight_white_1', 'b0');
  await delayedMove('rook_white_1', 'a0');

  let positions = shuffle()
  for (let key in positions) {
    await delayedMove(key, positions[key]);
  }
}

document.getElementById("button").addEventListener("click", generate);
