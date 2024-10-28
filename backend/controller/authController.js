const userModel = require('../model/UserModel')
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utilities/generateToken');

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