const jwt = require('jsonwebtoken');
const adminModel = require('../model/AdminModel');

module.exports.isAdmin = async (req,res,next) => {
    try{
        //check if token exist or not
        if(!req.cookies.agrokingAdminToken) return res.status(500).json({msg : 'login for admin required!'});

        //check if token exist and have some value
        if(req.cookies.agrokingAdminToken === "") return res.status(500).json({msg : 'login for admin required!'});

        //decoding value of token to identify admin
        let decoded = jwt.verify(req.cookies.agrokingAdminToken,process.env.JWT_KEY);
        let admin = await adminModel.findOne({email : decoded.email}).select('-password');
        if(admin){
            req.admin = admin;
            //if admin is logged in then go to next step
            next();
        }
        //otherwise return
        else return res.status(400).json({msg : 'login first!'});
    }
    catch(error)
    {
        return res.status(500).json({msg : 'something went wrong!'});
    }
}