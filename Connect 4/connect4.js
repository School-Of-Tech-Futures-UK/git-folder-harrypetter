/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */

//Global Variable Object
let global = {
turn : 0,
player : 'red',
score : 0,
receivedData : [],
red_name : 'Anonymous (Red)',
yellow_name : 'Anonymous (Yellow)',
win_indicator : 'still playing',
grid : [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]
}

//START OF DIRTY FUNCTIONS---------------------------------------------------------------------------------------------------------------------------

const boardClick = (e) => {
  const id = e.target.id // rowX-colY
  const colNum = id[8]
  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, global.grid)
 
  if (lowestAvailableRow !== null && lowestAvailableRow >= 0 && global.win_indicator === 'still playing') {
    global.turn++
    global.score = 42 - global.turn
    if (global.turn < 42) {
      if (global.player === 'red') {
        global.grid[lowestAvailableRow][colNum] = global.player
        drawBoard(lowestAvailableRow, colNum)
        global.player = takeTurn(global.player)
      } else {
        global.grid[lowestAvailableRow][colNum] = global.player
        drawBoard(lowestAvailableRow, colNum)
        global.player = takeTurn(global.player)
      }
    } 
    else {
      global.grid[lowestAvailableRow][colNum] = 'yellow'
      drawBoard(lowestAvailableRow, colNum)
      global.player = 'red'
      winnerMessage('nobody')
    }
    let winMatrix = [
    checkRow(global.grid),
    checkColumn(global.grid),
    checkDiagonal1(global.grid),
    checkDiagonal2(global.grid)]
    for (let i in winMatrix){
      if (winMatrix[i]){
        global.win_indicator = winMatrix[i]
        upload(winnerMessage(global.win_indicator), global.score)
        download()
        let highscoreboard = document.getElementById('highscore')
        setTimeout(() => {printHighScores(highscoreboard, global.receivedData)}, 200)
      }
    }
  
  }
}

const takeNames = () => {
  global.red_name = document.getElementById('rname').value + ' (Red)'
  global.yellow_name = document.getElementById('yname').value + ' (Yellow)'
}

const upload = (winner_name, score) => {
  fetch('http://localhost:3000/highscore', { // Your POST endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Username: winner_name, Score: score })
  })
    .then(function (response) {
      if (response.ok) {
        return
      } throw new Error('Request failed.')
    })
    .catch(function (error) {
      console.log(error)
    })
}

const download = async () => {
  const resp = await fetch('http://localhost:3000/highscore')
  const json = await resp.json()
  global.receivedData = json
}


const winnerMessage = (win_indicator) => {
  if (win_indicator == 'red') {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'red'
    hiddenText.textContent = `The winner is ${global.red_name}, scoring ${global.score} points!`
    hiddenText.style.color = 'white'
    return global.red_name

  } else if (win_indicator == 'yellow') {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'yellow'
    hiddenText.textContent = `The winner is ${global.yellow_name}, scoring ${global.score} points!`
    hiddenText.style.color = 'black'
    return global.yellow_name
    

  } else if (win_indicator == 'nobody') {
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
  if (global.grid[lowestAvailableRow][colNum] == 'red') {
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'red'
  } else if (global.grid[lowestAvailableRow][colNum ] == 'yellow') {
    document.getElementById(`row${lowestAvailableRow }-col${colNum}`).style.backgroundColor = 'yellow'
  }
}

const printHighScores = (highscoreboard, receivedData) => {
  highscoreboard.innerHTML = ''
  highscoreboard.style.display = 'block'
  for (let i in receivedData) {
    if (i < 10) {
      highscoreboard.innerHTML += '<p>' + receivedData[i].Username + ' : ' + receivedData[i].Score + '</p>'
    }
  }
}

//END OF DIRTY FUNCTIONS---------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
//START OF PURE FUNCTIONS--------------------------------------------------------------------------------------------------------------------------


const getLowestAvailableRowInColumn = (columnNumber, grid) => {
  for (let i = 5; i >= 0; i--) {
    if (grid[i][columnNumber] === null) {
      return i
    }
  }
}

const takeTurn = (colour) => {
  if (colour === 'red'){
    return 'yellow'
  }
  if (colour === 'yellow'){
    return 'red'
  }
}

const checkRow = (grid) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == grid[i][j + 1] &&
          grid[i][j] == grid[i][j + 2] &&
          grid[i][j] == grid[i][j + 3]) {
        if (grid[i][j] == 'red') {
          return 'red'
        }
        if (grid[i][j] == 'yellow') {
          return 'yellow'
        }
      }
    }
  }
}

const checkColumn = (grid) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i + 1][j] &&
          grid[i][j] == grid[i + 2][j] &&
          grid[i][j] == grid[i + 3][j]) {
        if (grid[i][j] == 'red') {
          return 'red'
        }
        if (grid[i][j] == 'yellow') {
          return 'yellow'
        }
      }
    }
  }
}

const checkDiagonal1 = (grid) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == grid[i + 1][j + 1] &&
          grid[i][j] == grid[i + 2][j + 2] &&
          grid[i][j] == grid[i + 3][j + 3]) {
        if (grid[i][j] == 'red') {
          return 'red'
        }
        if (grid[i][j] == 'yellow') {
          return 'yellow'
        }
      }
    }
  }
}

const checkDiagonal2 = (grid) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 6; j > 2; j--) {
      if (grid[i][j] == grid[i + 1][j - 1] &&
          grid[i][j] == grid[i + 2][j - 2] &&
          grid[i][j] == grid[i + 3][j - 3]) {
        if (grid[i][j] == 'red') {
          return 'red'
        }
        if (grid[i][j] == 'yellow') {
          return 'yellow'
        }
      }
    }
  }
}

const resetGame = () => {
  
  // const wipe = global.grid.map((element) => null) 
  // global.grid = wipe
  global.grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'white'
    }
  }

  global.player = 'red'
  global.turn = 0
  global.win_indicator = 'still playing'
  winnerMessage()
}

// END OF PURE FUNCTIONS--------------------------------------------------------------------------------------------------------------------------


// Export Modules (Comment out for testing)
module.exports = { 
  getLowestAvailableRowInColumn,
  checkRow,
  takeTurn,
  checkColumn,
  checkDiagonal1,
  checkDiagonal2
};
