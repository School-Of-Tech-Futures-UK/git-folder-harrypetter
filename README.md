## Harrys Connect 4 Game

# File Contents:
Node_modules (folder), .eslintrc.js, connect4.js, connect4.test.jsm, GraphikBold.otf, highscores.json, index.html, main.css, package.json, package-lock.json, server.js

# File description:
**connect4.js** - javascript code for game logic and DOM manipulation
**connect4.test.js** - test file, exectute by typing '''npx jest'''
**highscores.json** - stores highscore list * *(reduce to '[]' to reset list)* *
**index.html** - HTML file containing board structure
**main.css** - Supporting CSS file to add styles to index.html
**server.js** - back end server program

# Cloning instructions:

- Click code HTTPS
- CLick copy link
- Open windows powershell
- use '''cd ./filepath/filename/ ''' to navigate to the project directory
- type '''git clone <paste link>'''

# How to run files
- In powershell in the correct directory, type '''node server.js''' * *(Make sure you have node installed)* *
- Either open the HTML file or type 'localhost:3000:connect' into a browser
- Game will run while node is running
- To disable server, press CTRL + C in the powershell

# Game rules
- Click columns to place coins in the lowest unnocupied slot in that column
- Players take alternate turns
- Red moves first
- Enter player names and click submit at any point in the game if you would like to feature on the highscore board!
- The winner is the first person to place four adjacent coins either horizontally, vertcially or diagonally
- Press reset to submit highscores and start over
