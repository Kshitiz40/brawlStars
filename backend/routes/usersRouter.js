const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logout, sendOTPToUser, verifyOTP } = require('../controller/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const UserModel = require('../model/UserModel');
const { isUserVerified } = require('../middlewares/isUserVerified');
const { handleOrder } = require('../controller/orderController');

router.get('/', (req,res) => {
    res.send("working rt");
})

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.post('/sendOTP',isLoggedIn,sendOTPToUser);
router.post('/verifyOTP',isLoggedIn,verifyOTP);

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
});

router.post('/order',isLoggedIn,isUserVerified,handleOrder);

module.exports = router;