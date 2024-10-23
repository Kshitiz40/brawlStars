const jwt = require('jsonwebtoken');
const adminModel = require('../model/AdminModel');

module.exports.isAdmin = (req,res,next) => {
    try{
        if(!req.cookies.agrokingAdminToken) return res.status(500).json({msg : 'login for admin required!'});
    }
    catch(error)
    {
        return res.status(500).json({msg : 'something went wrong!'});
    }
}