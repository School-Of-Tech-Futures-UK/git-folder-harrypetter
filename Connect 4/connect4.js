const tag = document.getElementById("header")
tag.innerText = "Connect 4"
let turn = 0
let player1 = "red"
let win_red = false
let win_yellow = false


let grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

function takeTurn(e) {
    const id = e.target.id   //rowX-colY
    const colNum = id[8]
    const rowNum = id[3]
    const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)

    if (lowestAvailableRow !== null && win_red == false && win_yellow == false) {
        turn++
        if (player1 === "red") {
            grid[lowestAvailableRow][colNum - 1] = "red"
            document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'red';
            player1 = "yellow"
            checkWinnerRed()
        } else {
            grid[lowestAvailableRow][colNum - 1] = "yellow"
            document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'yellow';
            player1 = "red"
            checkWinnerYellow()
        }
    }
    console.log(`Turn number ${turn}`)
}

function getLowestAvailableRowInColumn(columnNumber, grid) {
    for (let i = 5; i >= 0; i--) {
        if (grid[i][columnNumber - 1] === null) {
            return i
        }
    }
    return null;
}

//|| (grid[i][j] == "red" && grid[i+1][j] == "red" && grid[i+2][j] == "red" && grid[i+3][j] == "red")

function checkWinnerRed(){
    for(let i = 0; i<6; i++){
        for(let j = 0; j<7; j++){
           if   ((grid[i][j] == "red" && grid[i][j+1] == "red" && grid[i][j+2] == "red" && grid[i][j+3] == "red"))
           {  
               win_red = true
           }
        }
    }

winnerMessage()
}

function checkWinnerYellow(){
    for(let i = 0; i<6; i++){
        for(let j = 0; j<7; j++){
           if   ((grid[i][j] == "yellow" && grid[i][j+1] == "yellow" && grid[i][j+2] == "yellow" && grid[i][j+3] == "yellow"))
           {  
               win_yellow = true
           }
        }
    }

winnerMessage()
}

function winnerMessage(){
    if(win_red == true){
        const hiddenText = document.getElementById('winner-display');
        hiddenText.style.display = 'block'
        hiddenText.textContent = "The winner is red!"
        }
    else if (win_yellow == true){
        const hiddenText = document.getElementById('winner-display');
        hiddenText.style.display = 'block'
        hiddenText.textContent = "The winner is yellow!"
        }
}

function resetGame(){
    grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]
    for(let i = 1; i<=6; i++){
        for(let j = 1; j<=7; j++){
            document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'transparent';
        }
    }
    player1 = "red"
    const hiddenText = document.getElementById('winner-display');
    hiddenText.style.display = 'none'
    turn = 0
    win_yellow = false
    win_red = false
    console.log("Game was reset")
}



