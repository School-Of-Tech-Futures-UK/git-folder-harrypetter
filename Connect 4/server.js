const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors')
let highscores = []

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
    res.json('can confirm I have it')
    highscores.push(winnerscore)
    console.log(highscores)
})




app.get('/highscore', (req, res) => {
    res.send(req.body.highscore)

})



app.listen(3000,() => {console.log("Server started")})
