const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../model/Productmodel');
const userModel = require('../model/UserModel');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hello");
})

module.exports = router;