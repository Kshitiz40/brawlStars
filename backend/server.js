const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const dbConnect = require('./config/dbConnect');
dbConnect();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

const indexRouter = require('./routes/indexRouter')
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

console.log(process.env.NODE_ENV)
app.use('/',indexRouter);
app.use('/admin',adminRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(PORT,()=>{
    console.log(`server running at PORT : ${PORT}`);
}) 