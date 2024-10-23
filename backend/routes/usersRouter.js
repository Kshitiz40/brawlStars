const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logout } = require('../controller/authController');

router.get('/', (req,res) => {
    res.send("working rt");
})

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout)
 
module.exports = router;