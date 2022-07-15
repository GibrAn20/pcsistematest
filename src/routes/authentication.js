const express = require('express');
const router = express.Router();
const pool = require('../database');



router.get('/signup', (req, res) => {
    res.render('credentials/signup');
});


router.get('/login', (req, res) => {
    res.render('credentials/login');
});



module.exports = router;