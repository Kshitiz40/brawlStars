const jwt = require('jsonwebtoken');
const userModel = require('../model/UserModel');

module.exports.isLoggedIn = async (req,res,next) => {
    if(!req.cookies.agrokingToken) return res.status(400).json({msg : "you need to login first!"});

    try{
        let decoded = jwt.verify(req.cookies.agrokingToken,process.env.JWT_KEY);
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        req.user = user;
        next();
    }
    catch(error)
    {
        return res.status(500).json({msg : 'something went wrong!'});
    }
}