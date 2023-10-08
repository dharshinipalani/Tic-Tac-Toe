const cell = document.querySelectorAll(".cell");
const text = document.querySelector("#text");
const btn = document.querySelector("#btn");



const winIndex = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let selected = ["","","","","","","","",""];
let currentPlayer = 'O';
let isAlive = false;

startGame();

function startGame(){
   cell.forEach(cell => cell.addEventListener("click",CellClicked));
   text.addEventListener('click',restartGame);
   text.textContent =`${currentPlayer}'s Turn`;
   isAlive = true;
}

function CellClicked(){
    const index = this.getAttribute("cellIndex");
    if(selected[index] != "" || !isAlive){
        return;
    }
    updateCell(this,index);
    checkWinner();
}
function updateCell(cell,index){
    selected[index] = currentPlayer;
    cell.textContent = currentPlayer ;
}
function changePlayer(){
    currentPlayer = currentPlayer == 'O' ? 'X' : 'O';
    text.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner(){
    let won = false;

    for(let i=0; i < winIndex.length;i++){
        const win = winIndex[i];
        const cellA = selected[win[0]];
        const cellB = selected[win[1]];
        const cellC = selected[win[2]];

    if(cellA == '' || cellB =='' || cellC == ''){
        continue;
    }
    if(cellA === cellB && cellB === cellC){
        won = true;
        break;
    }
    }
    if(won){
        text.textContent = `${currentPlayer} WON!!`
        isAlive = false;
        btn.addEventListener('click',restartGame);
    }
    else if(!selected.includes('')){
        text.textContent = `DRAW !!`;
        isAlive = false;
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    selected = ["","","","","","","","",""];
    currentPlayer = 'O';
    text.textContent = `${currentPlayer}'s Turn`;
    cell.forEach(cell => cell.textContent = "");
    isAlive = true;
}
