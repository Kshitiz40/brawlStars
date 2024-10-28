const userModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utilities/generateToken');
const sendOTP = require('../utilities/sendOTP');
const OTPModel = require('../model/OTPModel');
const {generateOTP} = require('../utilities/generateOTP');

exports.registerUser = async (req,res) => {
    //trying to create new user
    try{
        let {fullname, email, mobile, password } = req.body;
        
        //checking if user with given email already exists
        let checkUser = await userModel.findOne({email: email});
        if(checkUser) return res.status(400).json({msg : 'user with this email already exists!'});

        //hashing the password
        bcrypt.genSalt(10, (err,salt) => {
            if(err) return res.status(400).json({msg : 'error generating salt!'});
            bcrypt.hash(password,salt, async (err,hash)=>{
                if(err) return res.status(400).json({msg : 'error generating hash'});

                //creating new user
                let user = await userModel.create({fullname,email,mobile,password:hash})
                
                //creating token to identify user
                let token = generateToken(user);

                //setting cookie on user browser
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

exports.sendOTPToUser = async (req,res) => {
    const { email } = req.body;
    try{
        //make sure user have only one valid OTP at a time
        let otpExists = await OTPModel.findOne({email});
        if(otpExists) return res.status(400).json({msg : 'wait for 1 minute to send another OTP'});

        //generate OTP
        const otp = generateOTP();

        //create a document for this verification in OTP Model
        const createdOTP = await OTPModel.create({email,otp});

        //send OTP to user through mail
        await sendOTP(email,otp);
        return res.status(201).json({msg : 'otp send succesfully'});

    }catch(error){
        return res.status(400).json({msg : `Error : ${error.message}`});
    }
}

exports.verifyOTP = async (req,res) => { 
    const { email,otp } = req.body;
    try{
        //find the document in OTP model
        let otpRecord = await OTPModel.findOne({email,otp});
        if(!otpRecord) return res.status(400).json({msg : 'invalid otp or otp expired'});

        //find the corresponding user
        let user = await userModel.findOne({email});
        if(!user) return res.status(400).json({msg : 'no such user found'});

        //verify user
        user.isVerified = true;
        await user.save();

        //delete OTP document
        let deletedOTP = await OTPModel.findOneAndDelete({_id : otpRecord._id});

        return res.status(200).json({msg : 'user verified successfully!'});
    }
    catch(error){
        return res.status(400).json({msg : `Error : ${error.message}`});
    }
}

module.exports.loginUser = async (req,res) => {
    const { email, password } = req.body;

    //trying to log in user
    try{
        //check if email is valid
        let user = await userModel.findOne({email});
        if(!user) return res.status(400).json({msg : 'Invalid Credentials'});

        //compare the hash of passwords
        bcrypt.compare(password, user.password, (err,result)=>{
            if(err) return res.status(400).json({msg : 'something went wrong while logging in'});
            if(result)
            {
                //create and set token to identify user later
                let token = generateToken(user);
                res.cookie("agrokingToken", token ,{
                    httpOnly : true,
                    secure : process.env.NODE_ENV === 'production', //Ensure it works in production
                    sameSite : 'Strict', //CSRF protection
                    maxAge : 3600000, //1 hour
                });
                return res.status(200).json({msg : "user login successfull"});
            }
        })
    }
    catch(error){
        res.status(400).json({msg : "error while logging in. Try again"});
    }
}

module.exports.logout = (req,res)=>{
    //remove the value of token from user browser
    res.cookie('agroking-token',"");
    res.status(200).json({msg : 'logout successfull'});
}