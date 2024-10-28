const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin');
const upload = require('../config/multerConfig');
const adminModel = require('../model/AdminModel');
const userModel = require('../model/UserModel');
const orderModel = require('../model/OrderModel')
const categoriesModel = require('../model/CategoriesModel');
const productModel = require('../model/ProductModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utilities/generateToken')

//admin can only be created in development phase and not in production environment
if (process.env.NODE_ENV === 'development') {

    router.post("/create", async (req, res) => {
        let admin = await adminModel.find();
        //return if already one admin exists
        if (admin.length > 0) return res.status(504).json({ msg: "you don't have permission to create a new admin" });
        let { fullname, email, password } = req.body;
        //create admin
        bcryptjs.genSalt(10, (err, salt) => {
            if (err) return res.status(400).json({ msg: 'error generating salt!' });
            bcryptjs.hash(password, salt, async (err, hash) => {
                if (err) return res.status(400).json({ msg: 'error generating hash' });

                //creating new admin
                let createdAdmin = await adminModel.create({
                    fullname,
                    email,
                    password: hash
                });
                return res.status(201).json({ msg: 'admin created successfully!', admin: createdAdmin });
            })
        })
    })
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //trying to log in admin
    try {
        //check if email is valid
        let admin = await adminModel.findOne({ email });
        if (!admin) return res.status(400).json({ msg: 'Invalid Credentials' });

        //compare the hash of passwords
        bcrypt.compare(password, admin.password, (err, result) => {
            if (err) return res.status(400).json({ msg: 'something went wrong while logging in' });
            if (result) {
                //create and set token to identify user later
                let token = generateToken(admin);
                res.cookie("agrokingAdminToken", token, {
                    httpOnly: true,
                    sameSite: 'Strict', //CSRF protection
                    maxAge: 3600000, //1 hour
                });
                return res.status(200).json({ msg: "admin login successfull" });
            }
            else {
                return res.status(400).json({ msg: "your account do not exist" });
            }
        })
    }
    catch (error) {
        res.status(400).json({ msg: "error while logging in. Try again" });
    }
})

//admin - see all orders
router.get('/orders', isAdmin, async (req, res) => {
    try {
        let orders = await orderModel.find();
        res.status(201).json({ orders });
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

//admin - see all users
router.get('/users', isAdmin, async (req, res) => {
    try {
        let users = await userModel.find().select('-password');
        res.status(201).json({ users: users });
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

//admin - view all products
router.get('/products', isAdmin, async (req, res) => {
    try {
        let products = await productModel.find();
        res.status(201).json({ products });
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

//admin - see all categories
router.get('/categories', isAdmin, async (req, res) => {
    try {
        let categories = await categoriesModel.find();
        res.status(201).json({ categories });
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

//admin - add a product
router.post('/addProduct',isAdmin, upload.array('images', 4), async (req, res) => {
    try {
        const { name, description, price, discount, category,quantity } = req.body;

        //check if this categroy exists
        let categoryExists = await categoriesModel.findOne({category});
        if(!categoryExists) return res.status(400).json({msg : 'category do not exists!'});
        const categoryID = categoryExists._id;

        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype,
        }));

        const newProduct = new productModel({
            name, description, price, discount, categoryID, quantity, images
        });

        await newProduct.save();
        res.status(201).json({ msg: "Product Added successfully"});
    } catch (error) {
        return res.status(400).json({ msg: `Error : ${error.message}` });
    }
});

//admin - edit a product
router.post('/editProduct/:productID', isAdmin, upload.array('images', 4),async (req, res) => {
    try {
        
        const { name, description, price, discount, category, quantity } = req.body;

        //check if category exists
        let categoryExists = await categoriesModel.findOne({category});
        if(!categoryExists) return res.status(400).json({msg : 'category do not exists!'});
        const categoryID = categoryExists._id;

        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype,
        }));
        
        //check if product exists with given ID
        let product = await productModel.findOneAndUpdate({_id : req.params.productID},{name,description,price,discount,categoryID,quantity,images});
        if(!product) return res.status(400).json({msg : "product do not exists!"});

        res.status(201).json({ msg: "Product Edited successfully"});
    }
    catch(error){
        return res.status(400).json({msg : `Error: ${error.message}`})
    }
})

//admin - delete product
router.post('/deleteProduct/:productID', isAdmin, async (req, res) => {
    let product = await productModel.findOneAndDelete({ _id: req.params.productID });
    res.status(200).json({ msg: 'product removed' });
})

router.post('/addCategory', isAdmin, async (req, res) => {

    try {
        let { category } = req.body;
        let item = await categoriesModel.findOne({ category: category });
        if (item) return res.status(400).json({ msg: 'category already exist' });

        //add category 
        let createdItem = await categoriesModel.create({ category });
        return res.status(201).json({ msg: 'category created succesfully!', category: createdItem })
    } catch (error) {
        return res.status(400).json({ msg: 'some error occured while adding category!' });
    }
})

router.post('/editCategory/:categoryID', isAdmin, async (req, res) => {
    try {
        let { category } = req.body;
        let item = await categoriesModel.findOne({ _id: req.params.categoryID });
        if (!item) return res.status(400).json({ msg: 'category do not exists' });

        //editing the category
        item.category = category;
        await item.save();
        return res.status(201).json({ msg: "category updated!", newCategory: item });
    } catch (error) {
        return res.status(400).json({ msg: 'error while updating category' });
    }
})

router.post('/deleteCategory/:id', isAdmin, async (req, res) => {
    try {
        let item = await categoriesModel.findOneAndDelete({ _id: req.params.id });
        if (item) return res.status(200).json({ msg: 'category deleted successfully!', category: item });
        else return res.status(400).json({ msg: 'such category do not exists or error while deleting category!' })
    }
    catch (error) {
        return res.status(400).json({ msg: `Error : ${error.message}` });
    }
})
module.exports = router;