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

// router.post('/getlq', async (req, res) => {
//     const q = await Quotes.find().then((data) => {
//         console.log(data);
//         res.json({ list: q })
//     }).catch((err) => { console.log(err); res.json({ message: false }) });

// });

router.get('/getlq', async (req, res) => {
    try {
        const quotes = await Quotes.find();
        res.json(quotes);
    } catch (err) {
        console.log(err);
        res.json({ message: "false" })
    }
})

module.exports = router 