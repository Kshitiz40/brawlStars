const transporter = require('../config/nodeMailer');

async function sendOTP(email,otp){
    try {
        await transporter.sendMail({
            from : "noreply@agroking.com",
            to : email,
            subject : 'Your verification code',
            html :  `<p></p>Your OTP code is<b>${otp}</b>. It expires in 5 minutes.</p>`
        });
    }catch(error){
        return `error : ${error.message}`;
    }
}

module.exports = sendOTP;