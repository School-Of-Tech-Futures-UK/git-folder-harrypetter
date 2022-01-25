const lowrow = require('./connect4.js');

describe("When calling the lowestPositionInColumnFunction", () => {
    test("Can place the piece in an empty slot", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
          ]
        
        let columnNumber = 3
        const expectedOutput = 5
        //Act
        const actualOutput = lowrow.getLowestAvailableRowInColumn(columnNumber, grid)
        //Assert
        expect(actualOutput).toStrictEqual(expectedOutput);

    })
})

