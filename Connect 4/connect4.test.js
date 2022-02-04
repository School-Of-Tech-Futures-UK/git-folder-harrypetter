/* eslint-disable camelcase */
/* eslint-disable no-undef */
const connect = require('./connect4')

// TEST FOR LOWEST COLUMN POSITION
describe('When calling the lowestPositionInColumnFunction', () => {
  it('for empty, coin falls to bottom', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]

    const columnNumber = 3
    const expectedOutput = 5
    // Act
    const actualOutput = connect.getLowestAvailableRowInColumn(columnNumber, grid)
    // Assert
    expect(actualOutput).toBe(expectedOutput)
  })

  it('with one slot occupied, coin fills next lowest slot', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, 'red', null, null, null]
    ]

    const columnNumber = 3
    const expectedOutput = 4
    // Act
    const actualOutput = connect.getLowestAvailableRowInColumn(columnNumber, grid)
    // Assert
    expect(actualOutput).toBe(expectedOutput)
  })

  it('clicking a full column will not change the board state', () => {
    // Arrange
    const grid = [
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null]
    ]

    const columnNumber = 3
    const expectedOutput = undefined
    // Act
    const actualOutput = connect.getLowestAvailableRowInColumn(columnNumber, grid)
    // Assert
    expect(actualOutput).toBe(expectedOutput)
  })
})

// TEST FOR TAKE TURN
describe('When calling TakeTurn', () => {
  it('the grid is returned with the correct updated state', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null]
    ]
    const lowestRow = 0
    const column = 3
    const colour = 'yellow'
    const win_indicator = 'Still Playing'
    const actualOutput = connect.takeTurn(grid, lowestRow, column, colour, win_indicator)
    const expectedOutput = [
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null]
    ]
    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput)
  })

  it('selecting a column greater than 6 is not possible', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, null, 'red', null, null, null]
    ]
    const lowestRow = 0
    const column = 7
    const colour = 'yellow'
    const win_indicator = 'Still Playing'
    const actualOutput = connect.takeTurn(grid, lowestRow, column, colour, win_indicator)
    const expectedOutput = undefined
    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput)
  })
  it('splaying a move after a red win is not possible', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, 'red', 'yellow', null, null],
      [null, null, null, 'red', 'yellow', null, null],
      [null, null, null, 'red', 'yellow', null, null]
    ]
    const lowestRow = 0
    const column = 1
    const colour = 'yellow'
    const win_indicator = 'red'
    const actualOutput = connect.takeTurn(grid, lowestRow, column, colour, win_indicator)
    const expectedOutput = undefined
    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput)
  })

  it('playing a move after a red win is not possible', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, 'yellow', null, null],
      [null, null, null, 'red', 'yellow', null, null],
      [null, null, null, 'red', 'yellow', null, null],
      [null, null, 'red', 'red', 'yellow', null, null]
    ]
    const lowestRow = 0
    const column = 1
    const colour = 'yellow'
    const win_indicator = 'red'
    const actualOutput = connect.takeTurn(grid, lowestRow, column, colour, win_indicator)
    const expectedOutput = undefined
    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput)
  })
})

describe('When calling swapColour', () => {
  it('if player is red, next move will be yellow', () => {
    // Arrange
    const player = 'red'
    // Act
    const actualOutput = connect.swapColour(player)
    // Assert
    expect(actualOutput).toBe('yellow')
  })

  it('if player is yellow, next move will be red', () => {
    // Arrange
    const player = 'yellow'
    // Act
    const actualOutput = connect.swapColour(player)
    // Assert
    expect(actualOutput).toBe('red')
  })
})

// TESTS FOR CHECKWINNER
// TESTS FOR ROWS
describe('Placing 4 alike coins next to each other in a row returns data:', () => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      it(`win for four red coins in a row L2R starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'red'
        grid[i][j + 1] = 'red'
        grid[i][j + 2] = 'red'
        grid[i][j + 3] = 'red'
        const actualOutput = connect.checkRow(grid, 4)
        expect(actualOutput).toBe('red')
      })
    }
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      it(`win for four yellow coins in a row L2R starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'yellow'
        grid[i][j + 1] = 'yellow'
        grid[i][j + 2] = 'yellow'
        grid[i][j + 3] = 'yellow'
        const actualOutput = connect.checkRow(grid, 4)
        expect(actualOutput).toBe('yellow')
      })
    }
  }

  it('nothing if there are not 4 alike coins in a row', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['yellow', 'yellow', null, 'yellow', 'yellow', null, null]
    ]

    const actualOutput = connect.checkRow(grid, 4)
    // Assert
    expect(actualOutput).toBe(undefined)
  })
})

// TESTS FOR COLUMNS
describe('Placing 4 alike coins next to each other in a column returns data:', () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      it(`win for four red coins in a row vertically starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'red'
        grid[i + 1][j] = 'red'
        grid[i + 2][j] = 'red'
        grid[i + 3][j] = 'red'
        const actualOutput = connect.checkColumn(grid, 4)
        expect(actualOutput).toBe('red')
      })
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      it(`win for four yellow coins in a row vertically starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'yellow'
        grid[i + 1][j] = 'yellow'
        grid[i + 2][j] = 'yellow'
        grid[i + 3][j] = 'yellow'
        const actualOutput = connect.checkColumn(grid, 4)
        expect(actualOutput).toBe('yellow')
      })
    }
  }

  it('nothing if there are not 4 alike coins next to each other in a column', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null]
    ]

    const actualOutput = connect.checkColumn(grid, 4)
    // Assert
    expect(actualOutput).toBe(undefined)
  })
})

// TESTS FOR DIAGONALS
describe('Placing 4 alike disks next to each other diagonally returns data:', () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      it(`win for four red coins in a row diagonally (L2R, T2B) starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'red'
        grid[i + 1][j + 1] = 'red'
        grid[i + 2][j + 2] = 'red'
        grid[i + 3][j + 3] = 'red'
        const actualOutput = connect.checkDiagonal1(grid, 4)
        expect(actualOutput).toBe('red')
      })
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      it(`win for four yellow coins in a row diagonally (L2R, T2B) starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'yellow'
        grid[i + 1][j + 1] = 'yellow'
        grid[i + 2][j + 2] = 'yellow'
        grid[i + 3][j + 3] = 'yellow'
        const actualOutput = connect.checkDiagonal1(grid, 4)
        expect(actualOutput).toBe('yellow')
      })
    }
  }

  it('nothing if there are not 4 alike coins next to each other in (direction 1)', () => {
    // Arrange
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'yellow', null, null, null, null],
      [null, null, null, 'yellow', null, null, null]
    ]

    const actualOutput = connect.checkDiagonal1(grid, 4)
    // Assert
    expect(actualOutput).toBe(undefined)
  })

  for (let i = 0; i < 3; i++) {
    for (let j = 6; j > 2; j--) {
      it(`win for four red coins in a row counter-diagonally (L2R, B2T) starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'red'
        grid[i + 1][j - 1] = 'red'
        grid[i + 2][j - 2] = 'red'
        grid[i + 3][j - 3] = 'red'
        const actualOutput = connect.checkDiagonal2(grid, 4)
        expect(actualOutput).toBe('red')
      })
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 6; j > 2; j--) {
      it(`win for four yellow coins in a row counter-diagonally (L2R, B2T) starting from row ${j} and column ${i}`, () => {
        // Arrange
        const grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'yellow'
        grid[i + 1][j - 1] = 'yellow'
        grid[i + 2][j - 2] = 'yellow'
        grid[i + 3][j - 3] = 'yellow'
        const actualOutput = connect.checkDiagonal2(grid, 4)
        expect(actualOutput).toBe('yellow')
      })
    }
  }

  it('nothing if there are not 4 alike coins next to each other in (direction 2)', () => {
    // Arrange
    const grid = [
      [null, null, null, 'yellow', null, null, null],
      [null, null, 'yellow', null, null, null, null],
      [null, null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]

    const actualOutput = connect.checkDiagonal2(grid, 4)
    // Assert
    expect(actualOutput).toBe(undefined)
  })
})

// describe('When changing X', () => {
//   it('the change is reflected in the UI', () => {
//     // Arrange
//     const global = {
//       X: 3
//     }
//     // Act
//     const expectedResult = `Connect ${global.X}`
//     const actualResult = document.getElementById('header').innerHTML
//     takeX()
//     expect(actualResult).toBe(expectedResult)
//   })
// }
// )
