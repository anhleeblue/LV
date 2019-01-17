const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const checkAuth = require('../midddleware/check-auth');

// const Order = require('../model/order');
// const product =require('../model/products');
const stripe = require("stripe")("sk_test_qOFkYb6CvQ4ZpjZzHvpmeSRG");
router.post("/", async (req, res) => {
//   rs
console.log(req.body);
  
  try {

    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      // nickname:req.body.nickname,
      // name:req.body.nickname,
      currency: "vnd",
      description: "An example charge",
      source: req.body.id
    });
console.log(status);
    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;