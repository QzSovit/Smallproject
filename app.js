//check draw as well as winner
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset"); 
let winMsg = document.querySelector(".winnerMessage");
let newBtn = document.querySelector(".new_Btn");
let msg = document.querySelector("#msg");
let turnO = true; // playerO, playerX
let gameOver = false;
//patterns to win
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5], 
  [6, 7, 8],
];

// Reset board and game state
const resetBoard = () => {
  turnO = true;
  gameOver = false;
  msg.innerText = ''; // Clear message
  winMsg.classList.add("hide"); // Hide win message
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = '';
    box.classList.remove("highlight"); // Remove any highlight classes
  });
};

// Disable all boxes
const disableAllBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Show winner and disable board
const showWinner = (winner, winningPattern) => {
  msg.innerText = `Congratulations! ${winner} is the winner`;
  winMsg.classList.remove("hide");

  // Highlight the winning boxes
  winningPattern.forEach(index => {
    boxes[index].classList.add("highlight");
  });
  gameOver = true;
  disableAllBoxes();
};

// Check for a draw condition
const checkDraw = () => {
  return [...boxes].every(box => box.innerText !== '');
};

// Check for winner or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let boxA = boxes[a].innerText;
    let boxB = boxes[b].innerText;
    let boxC = boxes[c].innerText;
    
    // Check for winning pattern
    if (boxA && boxA === boxB && boxA === boxC) {
      showWinner(boxA, pattern); // Pass the winning pattern for highlighting
      return;
    }
  }
  
  // Check for a draw
  if (checkDraw()) {
    msg.innerText = "It's a draw!";
    winMsg.classList.remove("hide");
    gameOver = true;
  }
};

// Add event listener to each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (gameOver) return; // Prevent clicking if the game is over

    console.log(`Box ${index + 1} was clicked`);
    
    box.innerText = turnO ? "O" : "X";
    box.disabled = true; // Disable the clicked box
    
    turnO = !turnO; // Toggle turn
    
    checkWinner(); // Check winner after every move
  });
});

// Reset the game when reset or new game button is clicked
resetBtn.addEventListener("click", resetBoard);
newBtn.addEventListener("click", resetBoard);

