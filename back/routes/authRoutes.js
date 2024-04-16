const express = require('express');
const mongoose = require('mongoose');


const router = express.Router();
const Quotes = mongoose.model('Quotes');



router.post('/savelq', async (req, res) => {
    const arr = req.body;
    await Quotes.insertMany(arr)
        .then(() => console.log("save complete"))
        .catch((err) => console.log(err))
        .finally(res.send('save'))
})

let array = [];

router.get('/getlq', async (req, res) => {
    const q = await Quotes.find();
    //const q1 = JSON.parse(q);
    q.forEach((item, idx) => {
        array.push([item.contents, item.author])

    })
    console.log(array)
})

module.exports = router 