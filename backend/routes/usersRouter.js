const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logout } = require('../controller/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const UserModel = require('../model/UserModel');

router.get('/', (req,res) => {
    res.send("working rt");
})

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout)

//route to access cart of user - user need to be logged in
router.get('/cart',isLoggedIn,async (req,res)=>{
    let user = await UserModel.findOne({email:req.user.email}).populate('cart.product');
    return res.status(200).json({cart : user.cart});
})

//add product to cart of user
router.post('/addToCart/:productID',isLoggedIn,async (req,res)=>{
    let user = await UserModel.findOne({email:req.user.email});
    user.cart.push(req.params.productID);
    await user.save();
    return res.status(200).json({msg : "product added to cart succesfully!"});
})

//remove product from cart of user
router.post('/removeFromCart/:productID',isLoggedIn,async (req,res)=>{
    let user = await UserModel.findOne({email:req.user.email});
    let newCart = user.cart.filter(id => id!=req.params.productID);
    user.cart = newCart;
    await user.save();
    return res.status(200).json({msg : 'item removed from cart!'});
})

module.exports = router;