const express = require('express');
const cors = require('cors')
const app = express();

<<<<<<< HEAD
app.use(cors({origin: 'http://localhost:3000'}));

=======
//enabling dotenv library to use env variables
>>>>>>> a00994d00fee5554ffcc1388534cf808c6a7f116
const dotenv = require('dotenv')
dotenv.config();

//setting database connection
const dbConnect = require('./config/dbConnect');
dbConnect();

//including PORT, express-session and cookie-parser to read cookies
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;

//including different router files
const adminRouter = require('./routes/adminRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter  = require('./routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret : process.env.JWT_KEY,
}))

//setting routes for different routers
app.use('/admin',adminRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter); 
console.log(process.env.NODE_ENV)
app.listen(PORT,()=>{
    console.log(`server running at PORT : ${PORT}`);
}) 