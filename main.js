//Only check winner





console.log('Hello World!');
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset"); 
let winMsg= document.querySelector(".winnerMessage");
let newBtn=document.querySelector(".new_Btn");
let msg=document.querySelector("#msg");
let turnO = true; // playerO, playerX

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

boxes.forEach((box) => {
   box.addEventListener("click", () => {
     if (turnO=== true) { 
      box.innerText = "O";
      turnO = false;
     } else {
       box.innerText = "X";
       turnO = true;
      }
     box.disabled=true;
     checkWinner ();
   });
});

const disableBtn= ()=>{
 for(let box of boxes){
  box.disabled=true;
 };
};

const enable_boxes=()=>{
  for (let box of boxes) {
  box.disabled=false;
  box.innerText="";
  };
};
 
 const resetGame =()=>{
  turnO=true;
  enable_boxes();
  winMsg.classList.add("hide");
 } 




 const showWinner=(winner)=>{
  msg.innerText =`Congratulation ${winner} is the winner`;
  winMsg.classList.remove("hide");
  disableBtn();
 }

const checkWinner =() => {
   for(let pattern of winPatterns){
    
     let pos1Val=boxes[pattern[0]].innerText;
     let pos2Val=boxes[pattern[1]].innerText;
     let pos3Val=boxes[pattern[2]].innerText;
     
     if(pos1Val!=""&&pos2Val!=""&&pos3Val!=""){
       if (pos1Val==pos2Val&&pos2Val==pos3Val) {
        showWinner(pos1Val);
       };
     };
   };
};

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);
