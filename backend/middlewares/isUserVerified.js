const userModel = require('../model/UserModel');

module.exports.isUserVerified = async (req,res,next) => {
    const {email} = req.body;
    try{
        //check if user exists
        let user = await userModel.findOne({email});
        if(!user) return res.status(400).json({msg : 'user do not exists!'});

        //check if user is verified or not
        if(user.isUserVerified === false) return res.status(400).json({msg : 'user must be verified to perform this action!'});

        next();
    }catch(error){
        return res.status(400).json({msg : 'some error occured'});
    }
}