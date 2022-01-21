const tag = document.getElementById('header')
tag.innerText = "Connect 4"
let turn = 0
let player1 = 'red'
let win_red = false
let win_yellow = false
let nobody = false
let score = 0
let game = 0
let username = 'Harry'
let receivedData = []
let red_name = "Anonymous (Red)"
let yellow_name = "Anonymous (Yellow)"


let grid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]

const takeNames = () =>{
  red_name = document.getElementById('rname').value + " (Red)"
  yellow_name = document.getElementById('yname').value + " (Yellow)"
}


const takeTurn = (e) => {
  const id = e.target.id // rowX-colY
  const colNum = id[8]
  const rowNum = id[3]
  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)

  if (lowestAvailableRow !== null && win_red == false && win_yellow == false) {
    turn++
    if (turn < 42) {
      if (player1 === 'red') {
        grid[lowestAvailableRow][colNum - 1] = 'red'
        drawBoard(lowestAvailableRow, colNum)
        player1 = 'yellow'
      } else {
        grid[lowestAvailableRow][colNum - 1] = 'yellow'
        drawBoard(lowestAvailableRow, colNum)
        player1 = 'red'
      }
    } else {
      grid[lowestAvailableRow][colNum - 1] = 'yellow'
      drawBoard(lowestAvailableRow, colNum)
      player1 = 'red'
      nobody = true
    }
    checkRow()
    checkColumn()
    checkDiagonal1()
    checkDiagonal2()
    winnerMessage()
  }
  console.log(`Turn number ${turn}`)
}

const getLowestAvailableRowInColumn = (columnNumber, grid) => {
  for (let i = 5; i >= 0; i--) {
    if (grid[i][columnNumber - 1] === null) {
      return i
    }
  }
  return null
}
 


const upload = (winner_name, score) => {
fetch('http://localhost:3000/highscore', { // Your POST endpoint
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ Username : winner_name, Score :score})
})
.then(function(response) {
  if(response.ok) {
      return;
  }throw new Error('Request failed.');
  })
  .catch(function(error) {
  console.log(error);
  });
}


const download = async () => {
  console.log('downloading data')
  const resp = await fetch('http://localhost:3000/highscore')
  const json = await resp.json()
  console.log(json)
  receivedData = json
}

const checkRow = () => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i][j + 1] && 
          grid[i][j] == grid[i][j + 2] && 
          grid[i][j] == grid[i][j + 3]) {
        if (grid[i][j] == 'red') {
          win_red = true
        }
        if (grid[i][j] == 'yellow') {
          win_yellow = true
        }
      }
    }
  }
}

const checkColumn = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i + 1][j] &&
          grid[i][j] == grid[i + 2][j] && 
          grid[i][j] == grid[i + 3][j]) {
        if (grid[i][j] == 'red') {
          win_red = true
        }
        if (grid[i][j] == 'yellow') {
          win_yellow = true
        }
      }
    }
  }
}

const checkDiagonal1 = () =>{
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i + 1][j + 1] && 
          grid[i][j] == grid[i + 2][j + 2] && 
          grid[i][j] == grid[i + 3][j + 3]) {
        if (grid[i][j] == 'red') {
          win_red = true
        }
        if (grid[i][j] == 'yellow') {
          win_yellow = true
        }      
      }
    }
  }
}

const checkDiagonal2 = () =>{
  for (let i = 0; i < 3; i++) {
    for (let j = 7; j > 2; j--) {
      if (grid[i][j] == grid[i + 1][j - 1] && 
          grid[i][j] == grid[i + 2][j - 2] && 
          grid[i][j] == grid[i + 3][j - 3]) {
        if (grid[i][j] == 'red') {
          win_red = true
        }
        if (grid[i][j] == 'yellow') {
          win_yellow = true
        }  
      }
    }
  }
}

const winnerMessage = () =>{
  if (win_red == true) {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'red'
    hiddenText.textContent = 'The winner is red!'
    hiddenText.style.color = 'white'
    score = 42-turn
    upload(red_name,score)
    download()
    setTimeout(() => { printHighScores()
    }, 200);



  } else if (win_yellow == true) {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'yellow'
    hiddenText.textContent = 'The winner is yellow!'
    hiddenText.style.color = 'black'
    score = 42-turn
    upload(yellow_name, score)
    download()
    setTimeout(() => { printHighScores()
      }, 200);


  } else if (nobody == true) {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.textContent = 'Nobody wins'
    hiddenText.style.backgroundColor = 'blue'
    hiddenText.style.color = 'white'

  } else {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'none'
    const highscoreboard = document.getElementById('highscore')
    highscoreboard.style.display = 'none'
  }
}

const drawBoard = (lowestAvailableRow, colNum) => {
  if (grid[lowestAvailableRow][colNum - 1] == 'red') {
    document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = "red"
  } else if (grid[lowestAvailableRow][colNum - 1] == 'yellow') {
    document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = "yellow"
  }
}

const printHighScores = () => {
  console.log(receivedData)
  var highscoreboard = document.getElementById('highscore')
  highscoreboard.innerHTML = ""
  highscoreboard.style.display = 'block'
  for(var i=0; i < receivedData.length; i++){
    if (i < 10){
      highscoreboard.innerHTML += "<p>"+ receivedData[i].Username +" : " + receivedData[i].Score+"</p>"
    }
  }
}

const resetGame = () => {
  grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
  
  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 7; j++) {
      document.getElementById(`row${i}-col${j}`).style.backgroundColor = "white"
    }
  }

 
  player1 = 'red'
  turn = 0
  win_yellow = false
  win_red = false
  nobody = false
  console.log('Game was reset')
  winnerMessage()
  game++
}

