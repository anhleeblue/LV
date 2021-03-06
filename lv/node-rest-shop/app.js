const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const stripe = require('stripe')
// const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");
const binhluanRoutes = require("./api/routes/binhluan");
const stripeRoutes = require("./api/routes/stripe");
// mongoose.set('useFindAndModify', true);
// mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://admin:'+ process.env.MONGO_ATLAS_PW +'@node-shop-api-shard-00-00-8ceyl.mongodb.net:27017,node-shop-api-shard-00-01-8ceyl.mongodb.net:27017,node-shop-api-shard-00-02-8ceyl.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-api-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true } )
mongoose.Promise = global.Promise;
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Headers","*")
// })

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/binhluan", binhluanRoutes);
app.use("/charge", stripeRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
