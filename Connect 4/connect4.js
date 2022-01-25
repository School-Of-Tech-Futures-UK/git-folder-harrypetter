/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
let turn = 0
let player1 = 'red'
let score = 0
let receivedData = []
let red_name = 'Anonymous (Red)'
let yellow_name = 'Anonymous (Yellow)'
let win_indicator = 0 //1 if red win, 2 if yellow win, 3 if nobody win, 0 if still playing




let grid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]

const takeNames = () => {
  red_name = document.getElementById('rname').value + ' (Red)'
  yellow_name = document.getElementById('yname').value + ' (Yellow)'
}


const takeTurn = (e) => {
  const id = e.target.id // rowX-colY
  const colNum = id[8]
  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
 
  if (lowestAvailableRow !== null && lowestAvailableRow >= 0 && win_indicator === 0) {
    turn++
    score = 42 - turn
    if (turn < 42) {
      if (player1 === 'red') {
        grid[lowestAvailableRow][colNum] = 'red'
        drawBoard(lowestAvailableRow, colNum)
        player1 = 'yellow'
      } else {
        grid[lowestAvailableRow][colNum] = 'yellow'
        drawBoard(lowestAvailableRow, colNum)
        player1 = 'red'
      }
    } 
    else {
      grid[lowestAvailableRow][colNum] = 'yellow'
      drawBoard(lowestAvailableRow, colNum)
      player1 = 'red'
      winnerMessage(3)
    }
    let winMatrix = [
    checkRow(win_indicator),
    checkColumn(win_indicator),
    checkDiagonal1(win_indicator),
    checkDiagonal2(win_indicator)]
    for (let i in winMatrix){
      if (winMatrix[i]){
        win_indicator = winMatrix[i]
        upload(winnerMessage(win_indicator), score)
        download()
        setTimeout(() => {printHighScores()}, 200)
      }
    }
  
  }
}

const getLowestAvailableRowInColumn = (columnNumber, grid) => {
  for (let i = 5; i >= 0; i--) {
    if (grid[i][columnNumber] === null) {
      return i
    }
  }
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
  receivedData = json
}

const checkRow = (data) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i][j + 1] &&
          grid[i][j] == grid[i][j + 2] &&
          grid[i][j] == grid[i][j + 3]) {
        if (grid[i][j] == 'red') {
          return data = 1
        }
        if (grid[i][j] == 'yellow') {
          return data = 2
        }
      }
    }
  }
}

const checkColumn = (data) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i + 1][j] &&
          grid[i][j] == grid[i + 2][j] &&
          grid[i][j] == grid[i + 3][j]) {
        if (grid[i][j] == 'red') {
          return data = 1
        }
        if (grid[i][j] == 'yellow') {
          return data = 2
        }
      }
    }
  }
}

const checkDiagonal1 = (data) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] == grid[i + 1][j + 1] &&
          grid[i][j] == grid[i + 2][j + 2] &&
          grid[i][j] == grid[i + 3][j + 3]) {
        if (grid[i][j] == 'red') {
          return data = 1
        }
        if (grid[i][j] == 'yellow') {
          return data = 2
        }
      }
    }
  }
}

const checkDiagonal2 = (data) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 7; j > 2; j--) {
      if (grid[i][j] == grid[i + 1][j - 1] &&
          grid[i][j] == grid[i + 2][j - 2] &&
          grid[i][j] == grid[i + 3][j - 3]) {
        if (grid[i][j] == 'red') {
          return data = 1
        }
        if (grid[i][j] == 'yellow') {
          return data = 2
        }
      }
    }
  }
}

const winnerMessage = (win_indicator) => {
  if (win_indicator == 1) {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'red'
    hiddenText.textContent = `The winner is ${red_name}, scoring ${score} points!`
    hiddenText.style.color = 'white'
    return red_name

  } else if (win_indicator == 2) {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'yellow'
    hiddenText.textContent = `The winner is ${yellow_name}, scoring ${score} points!`
    hiddenText.style.color = 'black'
    return yellow_name
    

  } else if (win_indicator == 3) {
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
  if (grid[lowestAvailableRow][colNum] == 'red') {
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'red'
  } else if (grid[lowestAvailableRow][colNum ] == 'yellow') {
    document.getElementById(`row${lowestAvailableRow }-col${colNum}`).style.backgroundColor = 'yellow'
  }
}

const printHighScores = () => {
  let highscoreboard = document.getElementById('highscore')
  highscoreboard.innerHTML = ''
  highscoreboard.style.display = 'block'
  for (let i = 0; i < receivedData.length; i++) {
    if (i < 10) {
      highscoreboard.innerHTML += '<p>' + receivedData[i].Username + ' : ' + receivedData[i].Score + '</p>'
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

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'white'
    }
  }

  player1 = 'red'
  turn = 0
  win_indicator = 0
  winnerMessage()
}

// module.exports = {lowestAvailableRow}