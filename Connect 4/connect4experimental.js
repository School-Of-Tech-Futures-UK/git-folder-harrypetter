const tag = document.getElementById("header")
tag.innerText = "Harry's fantastic game of Connect 4"
let turn = 0
let player1 = "red"
let win_red = false
let win_yellow = false
let nobody = false



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
        if(turn < 42){
            if (player1 === "red") {
                grid[lowestAvailableRow][colNum - 1] = "red"
                drawBoard(lowestAvailableRow, colNum)
                player1 = "yellow"
            } else {
                grid[lowestAvailableRow][colNum - 1] = "yellow"
                drawBoard(lowestAvailableRow, colNum)
                player1 = "red"
            }
        }
        else{
            grid[lowestAvailableRow][colNum - 1] = "yellow"
            drawBoard(lowestAvailableRow, colNum)
            player1 = "red"
            nobody = true
        }
        checkRow()
        checkColumn()
        checkDiagonal1()
        checkDiagonal2()  
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


function checkRow(){
    for(let i = 0; i<6; i++){
        for(let j = 0; j<7; j++){
           if   ((grid[i][j] == "red" && grid[i][j+1] == "red" && grid[i][j+2] == "red" && grid[i][j+3] == "red"))
           {  
               win_red = true
           }
           if   ((grid[i][j] == "yellow" && grid[i][j+1] == "yellow" && grid[i][j+2] == "yellow" && grid[i][j+3] == "yellow"))
           {  
               win_yellow = true
           }
        }
    }

winnerMessage()
}

function checkColumn(){
    for(let i = 0; i <3 ; i++){
        for(let j = 0; j<7; j++){
            if (grid[i][j] == "red" && grid[i+1][j] == "red" && grid[i+2][j] == "red" && grid[i+3][j] == "red")
            {
                win_red = true
            }
            if (grid[i][j] == "yellow" && grid[i+1][j] == "yellow" && grid[i+2][j] == "yellow" && grid[i+3][j] == "yellow")
            {
                win_yellow = true
            }
        }
    }
winnerMessage()
}

function checkDiagonal1(){
    for(let i = 0; i<3; i++){
        for(let j = 0; j<7; j++){
            if (grid[i][j] == "red" && grid[i+1][j+1] == "red" && grid[i+2][j+2] == "red" && grid[i+3][j+3] == "red"){
                win_red = true
            }
            if (grid[i][j] == "yellow" && grid[i+1][j+1] == "yellow" && grid[i+2][j+2] == "yellow" && grid[i+3][j+3] == "yellow"){
                win_yellow = true
            }
        }
    }
winnerMessage()
}

function checkDiagonal2(){
    for(let i = 0; i<3; i++){
        for(let j = 7; j>2; j--){
            if (grid[i][j] == "red" && grid[i+1][j-1] == "red" && grid[i+2][j-2] == "red" && grid[i+3][j-3] == "red"){
                win_red = true
            }
            if (grid[i][j] == "yellow" && grid[i+1][j-1] == "yellow" && grid[i+2][j-2] == "yellow" && grid[i+3][j-3] == "yellow"){
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
        hiddenText.style.backgroundColor = 'red'
        hiddenText.style.justifyContent = 'center'
        hiddenText.textContent = "The winner is red!"
        hiddenText.style.color = "white"

        }
    else if (win_yellow == true){
        const hiddenText = document.getElementById('winner-display');
        hiddenText.style.display = 'block'
        hiddenText.style.backgroundColor = 'yellow'
        hiddenText.textContent = "The winner is yellow!"
        hiddenText.style.color = "black"
        }
    else if (nobody == true){
        const hiddenText = document.getElementById('winner-display');
        hiddenText.style.display = 'block'
        hiddenText.textContent = "Nobody wins"
        hiddenText.style.backgroundColor = 'blue'
        hiddenText.style.color = "white"
    }
    else{
        const hiddenText = document.getElementById('winner-display');
        hiddenText.style.display = 'none'
    }
}


function drawBoard(lowestAvailableRow, colNum){
    if(grid[lowestAvailableRow][colNum - 1] == "red"){
        document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).innerHTML = '🔴';
    }
    else if (grid[lowestAvailableRow][colNum - 1] == "yellow"){
        document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).innerHTML = '🟡';
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
            document.getElementById(`row${i}-col${j}`).innerText = '';
        }
    }
    player1 = "red"
    turn = 0
    win_yellow = false
    win_red = false
    nobody = false
    console.log("Game was reset")
    winnerMessage()
}
