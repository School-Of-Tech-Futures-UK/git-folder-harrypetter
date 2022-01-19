const express = require('express');
const app = express();
app.use(express.json())

const postwinner = (highscore) => {
    
    app.get('/highscore', (req, res) => {
        res.json({
            user1: highscore
        })
    })
}


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

app.listen(3000,() => {console.log("Server started")})
