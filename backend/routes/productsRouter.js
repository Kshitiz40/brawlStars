const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("working too")
})

module.exports = router;