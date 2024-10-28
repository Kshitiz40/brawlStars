const jwt = require('jsonwebtoken');
const userModel = require('../model/UserModel');

module.exports.isLoggedIn = async (req,res,next) => {
    //check if token exists
    if(!req.cookies.agrokingToken) return res.status(400).json({msg : "you need to login first!"});

    try{
        //decoding user from token
        let decoded = jwt.verify(req.cookies.agrokingToken,process.env.JWT_KEY);

        //checking whether that user exists or not
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        if(user) {
        //setting user to be used later in route
        req.user = user;
        //if user exists then continue on the same route
        next();
        }
        else return res.status(400).json({msg : "you need to login first"})
    }
    catch(error)
    {
        return res.status(500).json({msg : 'something went wrong!'});
    }
}