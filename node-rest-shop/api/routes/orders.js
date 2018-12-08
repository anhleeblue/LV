const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../midddleware/check-auth');

const Order = require('../model/order');
const product =require('../model/products');

// Handle incoming GET requests to /orders
router.get('/',checkAuth, (req, res, next) => {
   Order.find()
   .select('giohang sdt diachi userName _id tinhtrang')
   .exec()
   .then(docs => {
       res.status(200).json({
           count: docs.length,
           orders: docs.map(doc =>{
               return { 
                   _id: doc.id,
                   giohang: doc.giohang,
                   sdt: doc.sdt,
                   userName: doc.userName,
                    diachi: doc.diachi,
                    tinhtrang:doc.tinhtrang,
                   request: {
                       type: 'GET',
                       url: 'http://loalhost:4000/orders/' + doc._id
                   }

               }
           })
       });
   })
   .catch(err => {
       res.status(500).json({
           error: err
       })
   })
});

router.get('/:orderId',checkAuth, (req, res, next) => {
    Order.findById( req.params.orderId)
    .exec()
    .then( order =>{
        if(!order){
            return res.status(404).json({
                message: 'Order not found '
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type:'GET',
                url: 'http://localhost:3000/orders/'
            }
        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    })
});

//GET

router.post('/', (req, res, next) => {
    // product.findById(req.body.productId)
    // .then(product => {
    //     if(!product){
    //         return res.status(404).json({
    //             message: 'Product not found'
    //         })
    //     }
        const order = new Order( {
            _id: mongoose.Types.ObjectId(),
            giohang: req.body.giohang,
            diachi: req.body.diachi,
            sdt:req.body.sdt,
            userName:req.body.userName,
            tingtrang: false
            
        })
       order
       .save()
       .then(result => {
           console.log(result);
           res.status(201).json({
               message: 'Order stored',
               createdOrder: {
                   _id: result._id,
                   giohang: result.giohang,
                   diachi: result.diachi,
                   sdt:result.sdt,
                   userName:result.userName,
                   tinhtrang:result.tinhtrang
               },
               request: {
                type: 'GET',
                url: 'http://loalhost:4000/orders/' + result._id
            }
           });       
    })
    .catch(err => {
        res.status(500).json({
            message: 'Product not found',
            error: err
        });
    });

});


router.delete('/:orderId',checkAuth, (req, res, next) => {
   Order.remove( {_id: req.params.orderId})
   .exec()
   .then( result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type:'GET',
                url: 'http://localhost:3000/orders',
                body: {
                    productId: 'ID',
                    quantity: 'Number'
                }
            }
        });
    }
   )
   .catch( err => {
        res.status(500).json({
            error: err
        });
    })
});

module.exports = router;