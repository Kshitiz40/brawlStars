const mongoose = require('mongoose')

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("db connected successfully!")
    }
    catch(error){
        console.log(`error connecting in db!`);
        process.exit(1);
    }
}

module.exports = dbConnect