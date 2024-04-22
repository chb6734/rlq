const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Quotes = mongoose.model('Quotes');


// 명언 save (여러개)
router.post('/savelq', async (req, res) => {
    const arr = req.body;
    await Quotes.insertMany(arr)
        .then(() => console.log("save complete"))
        .catch((err) => console.log(err))
        .finally(res.send('save'))
});


//명언 전체리스트 
router.get('/getQouteList', async (req, res) => {
    try {
        const quotes = await Quotes.find();
        res.json(quotes);
    } catch (err) {
        console.log(err);
        res.json({ message: "false" })
    }
});

//명언 전체 중 하나 랜덤
router.get('/getRandomOne', async (req, res) => {
    var quoteslist = [];

    try {
        const quoteslist = await Quotes.find();
        console.log(quoteslist[Math.floor(Math.random() * quoteslist.length)]);
        res.json(quoteslist[Math.floor(Math.random() * quoteslist.length)]);
    } catch (err) {
        console.log(err);
        res.json({ message: "false" })
    }
});

module.exports = router 