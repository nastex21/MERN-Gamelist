require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

console.log("yes it's working");

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    console.log("WORKING?!");
    console.log(req.body);
    const userID = req.body.value;
    console.log(userID);
    var httpVar = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=${userID}&include_appinfo=true&format=json`;
    console.log(httpVar);
     try {
        console.log("try axios working");
        axios.get(httpVar)
            .then(data => res.send(data.data.response))
            .catch(err => res.send(err));
    }
    catch (err) {
        console.error("GG", err);
    } 

})


// Routes
//app.use('/api/dashboard', require('./routes/api/dashboard') );

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));