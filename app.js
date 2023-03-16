const express = require('express');
const hbs = require('express-handlebars')
const fileUpload = require('express-fileupload')  //for upload file
const db = require('./config/connection')

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(express.static('public'));
app.use(fileUpload())

db.connect((err)=>{
  if(err) console.log('database error',err)
  else console.log('dataBase Is Connected');
})

app.use(express.urlencoded({ extended: false }));  //(NB: without this signup form did't work(not get body), but addproduct worked)

app.use('/', userRouter);
app.use('/admin', adminRouter);


app.listen(process.env.PORT || 5000,()=>{
  console.log("server is running.......")
}) 
