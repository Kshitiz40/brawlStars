const express = require('express');
const router = express.Router();
const productModel = require('../model/ProductModel')
const categoryModel = require('../model/CategoriesModel')

router.get('/',async (req,res)=>{
    //home page - show products - user login not required
    try{
        let products = await productModel.find();
        res.status(200).json({products : products});
    }
    catch(error)
    {
        res.status(400).json({msg : `Error Occured : ${error.message}`});
    }
})

//route to get categories data
router.get('/categories',async (req,res)=>{
    try{
    let categories = await categoryModel.find();
    res.status(200).json({categories : categories});
    }
    catch(error)
    {
        res.json({msg : `Error Occured : ${error.message}`});
    }
})

router.get('/categories',(req,res) => {
    res.send("Working too")
})

module.exports = router;