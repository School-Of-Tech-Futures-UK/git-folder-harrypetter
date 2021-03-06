/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */

// Global Variable Object
let global = {
  turn: 0,
  player: 'red',
  score: 0,
  receivedData: [],
  red_name: 'Anonymous (Red)',
  yellow_name: 'Anonymous (Yellow)',
  win_indicator: 'still playing',
  X: 4,
  grid: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
}

// START OF DIRTY FUNCTIONS---------------------------------------------------------------------------------------------------------------------------

// The dirtiest function of them all :
// Called when column is clicked
const boardClick = (e) => {
  const colNum = e.target.id[8]
  // console.log(global.X)
  let valid = 1
  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, global.grid) // Find the lowest row for the selected column

  if (lowestAvailableRow >= 0 && global.win_indicator === 'still playing') { // If there is still a row that can be played AND nobody has won yet
    global.turn++ // Increment turn and calculate score
    global.score = 42 - global.turn
    if (global.turn < 42) { // If the game is not yet over, place piece, draw board and swap colour
      global.grid = takeTurn(global.grid, lowestAvailableRow, colNum, global.player, global.win_indicator)
      drawBoard(lowestAvailableRow, colNum, global.grid)
      global.player = swapColour(global.player)
    }
    else { // Same as above but if game is over -> cues sad blue sign
      global.grid[lowestAvailableRow][colNum] = 'yellow'
      drawBoard(lowestAvailableRow, colNum, global.grid)
      global.player = swapColour(global.player)
      winnerMessage('nobody')
    }
    // Calls all checkWinner functions into a matrix which then contains nulls unless one or more conditions are satisfied
    let winMatrix = [checkRow(global.grid, global.X), checkColumn(global.grid, global.X), checkDiagonal1(global.grid, global.X), checkDiagonal2(global.grid, global.X)]
    for (let i in winMatrix) { // loops through matrix to see if anybody won
      if (winMatrix[i]) {
        global.win_indicator = winMatrix[i] // if somebody won, set win_indicator to the winning colour
        upload(winnerMessage(global.win_indicator, global.X), global.score, global.X) // send name, colour and score to server
        download() // retrieve high score board
        let highscoreboard = document.getElementById('highscore') // call function after brief delay to print the highscore board
        setTimeout(() => { printHighScores(highscoreboard, global.receivedData) }, 200)
      }
    }
  }
}

// Takes names of players and updates global name variables
const takeNames = () => {
  global.red_name = document.getElementById('rname').value + ' (Red)'
  global.yellow_name = document.getElementById('yname').value + ' (Yellow)'
}

// Handles changing of value for X
const takeX = () => {
  if (document.getElementById('xname').value > 1 && document.getElementById('xname').value < 8) {
    global.X = document.getElementById('xname').value
    console.log(global.X)
    document.getElementById('header').innerHTML = `Connect ${global.X}`
    document.getElementById('Xtext').innerHTML = `Playing Connect ${global.X}, change X?`
  }
  else {
    document.getElementById('Xtext').innerHTML = 'X must be an integer between 2 and 7'
  }
}

// Fetch API for posting scores to the highscore board
const upload = (winner_name, score, X) => {
  fetch('http://localhost:3000/highscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Username: winner_name, Score: score, X: X })
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

// FETCH API for getting highscore board from server
const download = async () => {
  const resp = await fetch('http://localhost:3000/highscore')
  const json = await resp.json()
  global.receivedData = json
}

// Function to display winner message on HTML
const winnerMessage = (win_indicator, X) => {
  // If red wins, do some HTML and return red name as the winner
  if (win_indicator == 'red') {
    const hiddenText = document.getElementById('winner-display')
    playAudio('win.mp3')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'red'
    hiddenText.textContent = `The winner is ${global.red_name}, scoring ${global.score} points! [Connect ${X}]`
    hiddenText.style.color = 'white'
    return global.red_name
  // If yellow wins, do some HTML and return yellow name as the winner
  } else if (win_indicator == 'yellow') {
    const hiddenText = document.getElementById('winner-display')
    playAudio('win.mp3')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'yellow'
    hiddenText.textContent = `The winner is ${global.yellow_name}, scoring ${global.score} points! [Connect ${X}]`
    hiddenText.style.color = 'black'
    return global.yellow_name
    // If nobody wins, make a blue banner appear detailing tragic outcome
  } else if (win_indicator == 'nobody') {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.textContent = 'Nobody wins'
    hiddenText.style.backgroundColor = 'blue'
    hiddenText.style.color = 'white'
    // And if none of the above happens, keep the banner hidden and carry on as normal (i.e the game is still going)
  } else {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'none'
    const highscoreboard = document.getElementById('highscore')
    highscoreboard.style.display = 'none'
  }
}

// Take grid status and do HTML to draw the coloured coins
const drawBoard = (lowestAvailableRow, colNum, grid) => {
  if (grid[lowestAvailableRow][colNum] == 'red') {
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'red'
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).classList.add('fall')
    playAudio('coin.mp3')
  } else if (grid[lowestAvailableRow][colNum] == 'yellow') {
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'yellow'
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).classList.add('fall')
    playAudio('coin.mp3')
  }
}

// Print the highscores as a list that appears on completion of the game
// Only displays the top 10 as per user story
const printHighScores = (highscoreboard, receivedData) => {
  highscoreboard.innerHTML = ''
  highscoreboard.style.display = 'block'
  for (let i in receivedData) {
    if (i < 10) {
      highscoreboard.innerHTML += '<p>' + receivedData[i].Username + ` [C${receivedData[i].X}]` + ' : ' + receivedData[i].Score + '</p>'
    }
  }
}

// Resets the game and restores everything
const resetGame = () => {
  // Cheeky higher order function
  global.grid = global.grid.map((element) => [null, null, null, null, null, null, null])
  global.player = 'red'
  global.turn = 0
  global.win_indicator = 'still playing'
  // Hides the winner message
  winnerMessage()
  // Wipes board
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'white'
    }
  }
}

// END OF DIRTY FUNCTIONS---------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// START OF PURE FUNCTIONS--------------------------------------------------------------------------------------------------------------------------

// Finds the lowest available row
const getLowestAvailableRowInColumn = (columnNumber, grid) => {
  for (let lowestFree = 5; lowestFree >= 0; lowestFree--) {
    if (grid[lowestFree][columnNumber] === null) {
      return lowestFree
    }
  }
}

// Takes audio signal and plays
const playAudio = (x) => {
  new Audio(x).play()
}

// Updates the state of the grid
const takeTurn = (grid, lowestRow, column, colour, winner) => {
  if (winner != 'red' && winner != 'yellow') {
    if (column <= 6) {
      grid[lowestRow][column] = colour
      return grid
    }
  }
}

// Swaps the colour of the player every go
const swapColour = (colour) => {
  if (colour === 'red') {
    return 'yellow'
  }
  if (colour === 'yellow') {
    return 'red'
  }
}

// Loop through rows to search for winner
const checkRow = (grid, X) => {
  console.log(`Currently playing Connect ${X}`)
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < (8 - X); j++) {
      for (let search = 1; search < (X); search++) {
        if (grid[i][j + search] !== 'red') {
          break
        }
        if (grid[i][j] === grid[i][j + search] && grid[i][j] === 'red') {
          if (search === (X - 1)) {
            return 'red'
          }
        }
      }
      for (let search = 1; search < (X); search++) {
        if (grid[i][j + search] !== 'yellow') {
          break
        }
        if (grid[i][j] === grid[i][j + search] && grid[i][j] === 'yellow') {
          if (search === (X - 1)) {
            return 'yellow'
          }
        }
      }
    }
  }
}

// Loop through columns to check for winner
const checkColumn = (grid, X) => {
  for (let i = 0; i < (7 - X); i++) {
    for (let j = 0; j < 7; j++) {
      for (let search = 1; search < (X); search++) {
        if (grid[i + search][j] !== 'red') {
          break
        }
        if (grid[i][j] === grid[i + search][j] && grid[i][j] === 'red') {
          if (search === (X - 1)) {
            return 'red'
          }
        }
      }
      for (let search = 1; search < (X); search++) {
        if (grid[i + search][j] !== 'yellow') {
          break
        }
        if (grid[i][j] === grid[i + search][j] && grid[i][j] === 'yellow') {
          if (search === (X - 1)) {
            return 'yellow'
          }
        }
      }
    }
  }
}

// Loop through diagonals to check for winner
const checkDiagonal1 = (grid, X) => {
  for (let i = 0; i < (7 - X); i++) {
    for (let j = 0; j < (8 - X); j++) {
      for (let search = 1; search < (X); search++) {
        if (grid[i + search][j + search] !== 'red') {
          break
        }
        if (grid[i][j] === grid[i + search][j + search] && grid[i][j] === 'red') {
          if (search === (X - 1)) {
            return 'red'
          }
        }
      }
      for (let search = 1; search < (X); search++) {
        if (grid[i + search][j + search] !== 'yellow') {
          break
        }
        if (grid[i][j] === grid[i + search][j + search] && grid[i][j] === 'yellow') {
          if (search === (X - 1)) {
            return 'yellow'
          }
        }
      }
    }
  }
}

// Loop through counter-diagonals to check for winner
const checkDiagonal2 = (grid, X) => {
  for (let i = 0; i < (7 - X); i++) {
    for (let j = 6; j > (6 - X); j--) {
      for (let search = 1; search < (X); search++) {
        if (grid[i + search][j - search] !== 'red') {
          break
        }
        if (grid[i][j] === grid[i + search][j - search] && grid[i][j] === 'red') {
          if (search === (X - 1)) {
            return 'red'
          }
        }
      }
      for (let search = 1; search < (X); search++) {
        if (grid[i + search][j - search] !== 'yellow') {
          break
        }
        if (grid[i][j] === grid[i + search][j - search] && grid[i][j] === 'yellow') {
          if (search === (X - 1)) {
            return 'yellow'
          }
        }
      }
    }
  }
}
// END OF PURE FUNCTIONS--------------------------------------------------------------------------------------------------------------------------
// Export Modules (Comment out for testing)

module.exports = {
  getLowestAvailableRowInColumn,
  checkRow,
  takeTurn,
  swapColour,
  checkColumn,
  checkDiagonal1,
  checkDiagonal2,
  takeX
}
