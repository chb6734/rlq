const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const mongoose = require('mongoose');
const cors = require('cors');





require("dotenv").config({ path: 'variables.env' });


require('./models/Quotes');


const qouteroutes = require('./routes/quoteRoutes')
app.use(cors());
app.use(bodyParser.json());
app.use(qouteroutes);


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