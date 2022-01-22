/* eslint-disable node/no-path-concat */
/* eslint-disable no-undef */
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
const highscores = []
fs = require('fs')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
app.use(express.json()) // to support JSON-encoded bodies
app.use(express.static(__dirname + '/'))

app.get('/connect', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/highscore', (req, res) => {
  const winnerscore = req.body
  res.json('Data received by server')
  const sortByScore = (a, b) => b.Score - a.Score
  let fileData = JSON.parse(fs.readFileSync('highscores.json'))
  fileData.push(winnerscore)
  console.log(fileData)
  fileData.sort(sortByScore)
  fs.writeFileSync('highscores.json', JSON.stringify(fileData));
})

app.get('/highscore', (req, res) => {
  const fs = require('fs')
  fs.readFile('highscores.json', (err, data) => {
    if (err) throw err
    const returnscores = (JSON.parse(data))
    res.json(returnscores)
  })
})

app.listen(3000, () => { console.log('Server started') })
