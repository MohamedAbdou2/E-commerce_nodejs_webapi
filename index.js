const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: '../E-commerce_nodejs_webapi/process.env'});

const cors = require('cors');
// const { log } = require('console');

const app = express();
const port = 3003;


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
let proudctRouter = require('./routes/product.route.js');
let uerRouter = require('./routes/user.route.js');
let orederRouter = require('./routes/order.route.js');

app.use('/api/product',proudctRouter);

app.use('/api/user',uerRouter);

app.use('/api/order',orederRouter);






app.use(cors({
  origin : '*'
 }))

 app.use((err, req, res, next)=>{
  res.status(500).json({message: err.message})
})


app.use('*', (req,res,next)=>{
  res.status(404).json({massege : `you can't access this ${req.originalUrl}`})
})









mongoose.connect(
    "mongodb+srv://modohoda2468:pxPsj7oWe0hYP1Ns@backdb.evrnit7.mongodb.net/Node-Ecommerce?retryWrites=true&w=majority&appName=BACKDB"
  )
  .then(() => {
    console.log("Database Connected!");

    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((error) => console.log("connection to database failed", error));
