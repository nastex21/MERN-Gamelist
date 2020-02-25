require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

console.log("yes it's working");

app.use(cors());

/* app.get('/', function (req, res) {
    res.send("YES")
}) */

var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=76561197990189521&include_appinfo=true&format=json`;
app.get('/', function (req, res) {
    console.log("WORKING?!")
    try {
        axios.get(httpVar)
               .then(data => res.send(data.data.response))
               .catch(err => res.send(err));
     }
     catch(err){
        console.error("GG", err);
     }
    
})


// Routes
//app.use('/api/dashboard', require('./routes/api/dashboard') );

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));