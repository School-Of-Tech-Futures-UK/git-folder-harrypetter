const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors')
let highscores = []
fs = require('fs')
app.use(cors())
    


var bodyParser = require('body-parser');
const EnumerableOwnProperties = require('es-abstract/2017/EnumerableOwnProperties');
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
extended: true
}));
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.static(__dirname + '/'))

app.get('/connect',function(req,res) {
res.sendFile(__dirname + '/index.html');
});



app.post('/highscore', (req, res) => {
    const winnerscore = req.body
    res.json('Data received by server')
    highscores.push(winnerscore)
    const sortByScore = (a,b) => b.Score-a.Score
    highscores.sort(sortByScore)
    console.log(highscores)
    const fileData = JSON.parse(fs.readFileSync('highscores.json'))
    fs.writeFileSync('highscores.json', JSON.stringify(highscores, null, 2));
    fileData.push(highscores)
    
    
})

// require('fs').appendFile(

//     './highscores.json',

//     JSON.stringify(highscores),

//     function (err) {
//         if (err) {
//             console.error('Could not save file');
//         }
//     }
// );




app.get('/highscore', (req, res) => {
    const fs = require('fs');
    fs.readFile('highscores.json', (err, data) => {
        if (err) throw err;
        let returnscores = JSON.parse(data);;
        res.json(returnscores)
        })

})



app.listen(3000,() => {console.log("Server started")})
