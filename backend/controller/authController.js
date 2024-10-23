const userModel = require('../model/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utilities/generateToken');

exports.registerUser = async (req,res) => {
    try{
        let {fullname, email, mobile, password } = req.body;
        
        let checkUser = await userModel.findOne({email: email});
        if(checkUser) return res.status(400).json({msg : 'user with this email already exists!'});

        bcrypt.genSalt(10, (err,salt) => {
            if(err) return res.status(400).json({msg : 'error generating salt!'});
            bcrypt.hash(password,salt, async (err,hash)=>{
                if(err) return res.status(400).json({msg : 'error generating hash'});
                let user = await userModel.create({fullname,email,mobile,password:hash})
                let token = generateToken(user);
                res.cookie("agrokingToken", token ,{
                    httpOnly : true,
                    secure : process.env.NODE_ENV === 'production', //Ensure it works in production
                    sameSite : 'Strict', //CSRF protection
                    maxAge : 3600000, //1 hour
                });
                res.status(201).json({msg : 'user created successfully!'});
            }) 
        })
    }
    catch(error) {
        res.status(400).json({msg : 'something went wrong!'});
    }
}

module.exports.loginUser = async (req,res) => {
    const { email, password } = req.body;

    try{
        let user = await userModel.findOne({email});
        if(!user) return res.status(400).json({msg : 'Invalid Credentials'});

        bcrypt.compare(password, user.password, (err,result)=>{
            if(err) return res.status(400).json({msg : 'something went wrong while logging in'});
            if(result)
            {
                let token = generateToken(user);
                res.cookie("agrokingToken", token ,{
                    httpOnly : true,
                    secure : process.env.NODE_ENV === 'production', //Ensure it works in production
                    sameSite : 'Strict', //CSRF protection
                    maxAge : 3600000, //1 hour
                });
                return res.status(200).redirect('/');
            }
        })
    }
    catch(error){
        res.status(400).json({msg : "error while logging in. Try again"});
    }
}

module.exports.logout = (req,res)=>{
    res.cookie('agroking-token',"");
    res.status(200).json({msg : 'logout successfull'});
}