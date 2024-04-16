const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const { mogoUrl } = require('./key');
const mongoose = require('mongoose');

require('./models/User');
app.use(bodyParser.json());

mongoose.connect(mogoUrl, {
    useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})

mongoose.connection.on('error', (err) => {
    console.log("this is error", err)
})


app.post('/', (req, res) => {
    console.log(req.body)
    res.send('hello')
})

app.listen(PORT, () => {
    console.log("server running" + PORT);
})