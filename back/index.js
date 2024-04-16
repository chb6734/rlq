const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const mongoose = require('mongoose');


require("dotenv").config({ path: 'variables.env' });


require('./models/Quotes');


const authroutes = require('./routes/authRoutes')
app.use(bodyParser.json());
app.use(authroutes);

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("connected"))
    .catch(err => console.log(err))



app.post('/', (req, res) => {
    console.log(req.body)
    res.send('hello')
})

app.listen(PORT, () => {
    console.log("server running" + PORT);
})