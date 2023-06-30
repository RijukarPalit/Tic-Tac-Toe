const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn  = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialise the game
function initGame () {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI empty
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more remove green color(intialise box with css properties again)
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
           && (gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if(gameGrid[position[0]] === "X")
               answer = "X";
            else 
               answer = "O"; 

               //disable pointer events
               boxes.forEach((box) => {
                box.style.pointerEvents = "none";
               })
            
            //now we know X/O is a winner
            boxes[position[0]].classList.add("win"); 
            boxes[position[1]].classList.add("win"); 
            boxes[position[2]].classList.add("win"); 
           }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameinfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //lets check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board if Filled, game is TIE
    if(fillCount === 9) {
        gameinfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check keu jiteche naki
        checkGameOver ();
    }
}  

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);