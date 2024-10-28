const userModel = require('../model/UserModel');
const orderModel = require('../model/OrderModel');

exports.handleOrder = async  (req,res) => {
    const { email } = req.body;
    try{
        
    }catch(error){
        return res.status(400).json({msg : `Error : ${error.message}`});
    }
};