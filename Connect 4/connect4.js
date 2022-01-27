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
  let valid = 1
  // Find the lowest row for the selected column
  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, global.grid)
  // If there is still a row that can be played AND nobody has won yet
  if (lowestAvailableRow >= 0 && global.win_indicator === 'still playing') {
    // Increment turn and calculate score
    global.turn++
    global.score = 42 - global.turn
    // Cheeky console log
    console.log(`Turn number ${global.turn}`)
    // If the game is not yet over, place piece, draw board and swap colour
    if (global.turn < 42) {
      global.grid = takeTurn(global.grid, lowestAvailableRow, colNum, global.player, global.win_indicator)
      drawBoard(lowestAvailableRow, colNum, global.grid)
      global.player = swapColour(global.player)
    }
    // Same as above but if game is over -> cues sad blue sign
    else {
      global.grid[lowestAvailableRow][colNum] = 'yellow'
      drawBoard(lowestAvailableRow, colNum, global.grid)
      global.player = swapColour(global.player)
      winnerMessage('nobody')
    }
    // Calls all checkWinner functions into a matrix which then contains nulls unless one or more conditions are satisfied
    let winMatrix = [checkRow(global.grid), checkColumn(global.grid), checkDiagonal1(global.grid), checkDiagonal2(global.grid)]

    // loops through matrix to see if anybody won
    for (let i in winMatrix) {
      if (winMatrix[i]) {
        // if somebody won, set win_indicator to the winning colour
        global.win_indicator = winMatrix[i]
        // send name, colour and score to server
        upload(winnerMessage(global.win_indicator), global.score)
        // retrieve high score board
        download()
        // call function after brief delay to print the highscore board
        let highscoreboard = document.getElementById('highscore')
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

// Fetch API for posting scores to the highscore board
const upload = (winner_name, score) => {
  fetch('http://localhost:3000/highscore', {
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

// FETCH API for getting highscore board from server
const download = async () => {
  const resp = await fetch('http://localhost:3000/highscore')
  const json = await resp.json()
  global.receivedData = json
}

// Function to display winner message on HTML
const winnerMessage = (win_indicator) => {
  // If red wins, do some HTML and return red name as the winner
  if (win_indicator == 'red') {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'red'
    hiddenText.textContent = `The winner is ${global.red_name}, scoring ${global.score} points!`
    hiddenText.style.color = 'white'
    return global.red_name
  // If yellow wins, do some HTML and return yellow name as the winner
  } else if (win_indicator == 'yellow') {
    const hiddenText = document.getElementById('winner-display')
    hiddenText.style.display = 'block'
    hiddenText.style.backgroundColor = 'yellow'
    hiddenText.textContent = `The winner is ${global.yellow_name}, scoring ${global.score} points!`
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
  } else if (grid[lowestAvailableRow][colNum] == 'yellow') {
    document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'yellow'
  }
}

// Print the highscores as a list that appears on completion of the game
// Only displays the top 10 as per user story
const printHighScores = (highscoreboard, receivedData) => {
  highscoreboard.innerHTML = ''
  highscoreboard.style.display = 'block'
  for (let i in receivedData) {
    if (i < 10) {
      highscoreboard.innerHTML += '<p>' + receivedData[i].Username + ' : ' + receivedData[i].Score + '</p>'
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

// Loop through columns to check for winner
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

// Loop through diagonals to check for winner
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

// Loop through counter-diagonals to check for winner
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
// END OF PURE FUNCTIONS--------------------------------------------------------------------------------------------------------------------------

// Export Modules (Comment out for testing)

module.exports = {
  getLowestAvailableRowInColumn,
  checkRow,
  takeTurn,
  swapColour,
  checkColumn,
  checkDiagonal1,
  checkDiagonal2
}
