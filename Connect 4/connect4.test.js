const connect = require('./connect4');


//TEST FOR LOWEST COLUMN POSITION
describe("When calling the lowestPositionInColumnFunction", () => {
    it("for empty, coin falls to bottom", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
          ]
        
        const columnNumber = 3
        const expectedOutput = 5
        //Act
        const actualOutput = connect.getLowestAvailableRowInColumn(columnNumber, grid)
        //Assert
        expect(actualOutput).toBe(expectedOutput);

    })


    it("with one slot occupied, coin fills next lowest slot", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, "red", null, null, null]
          ]
        
        const columnNumber = 3
        const expectedOutput = 4
        //Act
        const actualOutput = connect.getLowestAvailableRowInColumn(columnNumber, grid)
        //Assert
        expect(actualOutput).toBe(expectedOutput);

    })
})

//TESTS FOR CHECKWINNER
//TESTS FOR ROWS
describe("Placing 4 alike coins next to each other in a row returns data:", () => {
    it("a win for red coins", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['red', 'red', 'red', 'red', null, null, null]
          ]
        
        
        const actualOutput = connect.checkRow(grid)
        //Assert
        expect(actualOutput).toBe('red');

    })
    it("a win for yellow coins", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', 'yellow', 'yellow', 'yellow', null, null, null]
          ]
        
        
        const actualOutput = connect.checkRow(grid)
        //Assert
        expect(actualOutput).toBe('yellow');

    })
    it("nothing if there are not 4 alike coins in a row", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', 'yellow', null, 'yellow', 'yellow', null, null]
          ]
        
        
        const actualOutput = connect.checkRow(grid)
        //Assert
        expect(actualOutput).toBe(undefined);

    })
})

//TESTS FOR COLUMNS
describe("Placing 4 alike coins next to each other in a column returns data:", () => {
    it("a win for red coins", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['red', null, null, null, null, null, null],
            ['red', null, null, null, null, null, null],
            ['red', null, null, null, null, null, null],
            ['red', null, null, null, null, null, null]
          ]
        
        
        const actualOutput = connect.checkColumn(grid)
        //Assert
        expect(actualOutput).toBe('red');

    })
    it("a win for yellow coins", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null]
          ]
        
        
        const actualOutput = connect.checkColumn(grid)
        //Assert
        expect(actualOutput).toBe('yellow');

    })
    it("nothing if there are not 4 alike coins next to each other in a column", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null]
          ]
        
        
        const actualOutput = connect.checkColumn(grid)
        //Assert
        expect(actualOutput).toBe(undefined);

    })
})

//TESTS FOR DIAGONALS
describe("Placing 4 alike disks next to each other diagonally returns data:", () => {
    it("a win for red coins (direction 1)", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['red', null, null, null, null, null, null],
            [null, 'red', null, null, null, null, null],
            [null, null, 'red', null, null, null, null],
            [null, null, null, 'red', null, null, null]
          ]
        
        
        const actualOutput = connect.checkDiagonal1(grid)
        //Assert
        expect(actualOutput).toBe('red');

    })
    it("a win for yellow coins (direction 1)", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            [null, 'yellow', null, null, null, null, null],
            [null, null, 'yellow', null, null, null, null],
            [null, null, null, 'yellow', null, null, null]
          ]
        
        
        const actualOutput = connect.checkDiagonal1(grid)
        //Assert
        expect(actualOutput).toBe('yellow');

    })
    it("nothing if there are not 4 alike coins next to each other in (direction 1)", () => {
        //Arrange
        let grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, 'yellow', null, null, null, null],
            [null, null, null, 'yellow', null, null, null]
          ]
        
        
        const actualOutput = connect.checkDiagonal1(grid)
        //Assert
        expect(actualOutput).toBe(undefined);

    })
    
    it("a win for red coins (direction 2)", () => {
        //Arrange
        let grid = [
            [null, null, null, 'red', null, null, null],
            [null, null, 'red', null, null, null, null],
            [null, 'red', null, null, null, null, null],
            ['red', null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
          ]
        
        
        const actualOutput = connect.checkDiagonal2(grid)
        //Assert
        expect(actualOutput).toBe('red');

    })
    it("a win for yellow coins (direction 2)", () => {
        //Arrange
        let grid = [
            [null, null, null, 'yellow', null, null, null],
            [null, null, 'yellow', null, null, null, null],
            [null, 'yellow', null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
          ]
        
        
        const actualOutput = connect.checkDiagonal2(grid)
        //Assert
        expect(actualOutput).toBe('yellow');

    })
    it("nothing if there are not 4 alike coins next to each other in (direction 2)", () => {
        //Arrange
        let grid = [
            [null, null, null, 'yellow', null, null, null],
            [null, null, 'yellow', null, null, null, null],
            [null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
          ]
        
        
        const actualOutput = connect.checkDiagonal2(grid)
        //Assert
        expect(actualOutput).toBe(undefined);

    })
})



