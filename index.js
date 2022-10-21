var express = require('express');
var app = express();
const  parseString = require('xml2js').parseString;
const { resolve } = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
app.use(express.static("public"));
const url = 'https://www.sharkscope.com/api/roots/networks/PokerStars/activeTournaments?filter=Type:H,D,N,T,NL;Type!:SAT';


app.get('/', (req, res) => {
    const path = resolve('/index.html');
    res.sendFile(path);
});

const headers = {'Username': 'jmarcel@live.com',
                'Password': 'c6bfa8ffebaa4a28e8372b21b113ec10'
            };

app.get('/tournament', async (req, res) => {
          fetch(url, {headers}).then(xml =>xml.text()).then(
            (data)=> {
              parseString(data, function (err, result) {
                return res.json(result);
            });
            });
})


app.listen(process.env.PORT || 4000, () => console.log('Node server listening on port 4242!'));