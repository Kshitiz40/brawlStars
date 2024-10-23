const express = require('express');
const router = express.Router();
const adminModel = require('../model/AdminModel');
const upload = require('../config/multerConfig');

if(process.env.NODE_ENV === 'development'){

    router.post("/create", async (req,res) => {
        let admin = await adminModel.find();
        if(admin.length > 0) return res.status(504).json({msg : "you don't have permission to create a new admin"});
        let { fullname, email, password } = req.body;
        let createdAdmin = await adminModel.create({
            fullname,
            email,
            password
        });
        res.status(201).json({msg : "Admin created successfully!", admin : createdAdmin});
    })
}

router.get("/", (req,res) => {
    res.send("You are an admin");
})

router.get('/orders',(req,res)=>{

})

router.get('/users',(req,res)=>{

})

router.get('/products',(req,res)=>{

})

router.post('/addProduct',upload.array('images',4),async (req,res)=>{
    try{
    const { name,description,price,discount,category } = req.body;

    const images = req.files.map(file => ({
        data : file.buffer,
        contentType : file.mimetype,
    }));

    const newProduct = new productModel ({
        name, description, price,discount,category,images
    });

    await newProduct.save();
    console.log("Product added!")
    res.status(201).json({msg : "Product Added successfully"});
    }catch(error)
    {
        console.log("error adding");
    }
});

module.exports = router;