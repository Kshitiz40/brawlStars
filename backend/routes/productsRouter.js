const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("working too")
})

router.get('/categories',(req,res) => {
    res.send("Working too")
})

module.exports = router;