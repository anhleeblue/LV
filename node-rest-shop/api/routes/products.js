const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../midddleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null, './uploads/');
    },
    filename: function(req, file , cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const  fileFilter = (req, file , cb) => {
    if(file.mmetype === 'image/png' || file.mmetype === 'image/jpeg'){
        cb(null, true);
    } else{
        cb(null, false);
    }
   
};

const upload = multer({
    storage: storage
});

const Product = require('../model/products');
router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id productImage xuatxu congdung cachdung tinhtrang loai binhluans')
    .exec()
    .then(docs => {
       const reponse = {
           count: docs.length,
           products: docs.map( doc =>{
               return {
                   name: doc.name,
                   price:doc.price,
                   productImage:doc.productImage,
                   _id:doc._id,
                   xuatxu:doc.xuatxu,
                   congdung:doc.congdung,
                   cachdung:doc.cachdung,
                   tinhtrang:doc.tinhtrang,
                   loai:doc.loai,
                   binhluans:doc.binhluans,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:4000/products/' + doc._id
                   }
               }
           })
       };
        // if( docs.length >= 0 ){
            res.status(200).json(reponse);
        // }else{
        //     res.status(404).json({
        //         message: 'No entries found'
        //     });
        // }
    })
    
});

router.get('/gets/:type', (req, res, next) => {
    const t = req.params.type
    const flag = t == 0 ? "Tất cả" : t == 1 ? "Thuốc bảo vệ thực vật" : t == 2 ? "Phân Bón" : t == 3 ? "Khác" : null;
    if (t == 0) {
        Product.find()
            .select('name price _id productImage xuatxu congdung cachdung tinhtrang loai binhluans')
            .exec()
            .then(docs => {
                const reponse = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            _id: doc._id,
                            xuatxu: doc.xuatxu,
                            congdung: doc.congdung,
                            cachdung: doc.cachdung,
                            tinhtrang: doc.tinhtrang,
                            loai: doc.loai,
                            binhluans: doc.binhluans,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/products/' + doc._id
                            }
                        }
                    })
                };
                // if( docs.length >= 0 ){
                res.status(200).json(reponse);
                // }else{
                //     res.status(404).json({
                //         message: 'No entries found'
                //     });
                // }
            })
    } else {
        Product.find()
            .select('name price _id productImage xuatxu congdung cachdung tinhtrang loai binhluans')
            .where('loai').equals(flag)
            .exec()
            .then(docs => {
                const reponse = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            _id: doc._id,
                            xuatxu: doc.xuatxu,
                            congdung: doc.congdung,
                            cachdung: doc.cachdung,
                            tinhtrang: doc.tinhtrang,
                            loai: doc.loai,
                            binhluans: doc.binhluans,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/products/' + doc._id
                            }
                        }
                    })
                };
                // if( docs.length >= 0 ){
                res.status(200).json(reponse);
                // }else{
                //     res.status(404).json({
                //         message: 'No entries found'
                //     });
                // }
            })
    }
});

router.post('/',checkAuth ,upload.single('productImage'),(req, res, next) => {
    
    const host = req.host;
    const filePath = req.protocol + "://" + host + ':4000/' + "uploads/" + req.file.filename;
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        xuatxu:req.body.xuatxu,
        congdung:req.body.congdung,
        cachdung:req.body.cachdung,
        tinhtrang:req.body.tinhtrang,
        loai:req.body.loai,
        binhluans:req.body.binhluans,
         productImage: filePath
    });
    product.save().then( result => {
        
        res.status(201).json({
            message: 'Create produc successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                productImage:result.productImage,
                xuatxu:result.xuatxu,
                congdung:result.congdung,
                cachdung:result.cachdung,
                tinhtrang:result.tinhtrang,
                loai:result.loai,
                binhluans:result.binhluans,
                _id:result._id,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:4000/products/' + result._id
                   }
                

            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
        
    });
    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage congdung cachdung loai xuatxu tinhtrang binhluans')
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if( doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'GET',
                    url: 'http://localhost:4000/products/'
                            }
                        
            });
        }else{
            res.status(404).json({ message: 'No valid entry found for provided ID'});
        }
        res.status(200).json(doc);
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err});    
    })
});

router.patch('/:productId',checkAuth, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            product: {name: result.name,
                price: result.price,
                productImage:result.productImage,
                xuatxu:result.xuatxu,
                congdung:result.congdung,
                cachdung:result.cachdung,
                tinhtrang:result.tinhtrang,
                loai:result.loai,
                binhluans:result.binhluans,
                _id:result._id},
            request: {
                type: 'GET',
                url : 'http://localhost:4000/products/'+ id
            }
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
/* comment to an event. */
router.patch('/binhluan/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    console.log(req.body);
    var binhluan = {   
        
        userName:req.body.userName,
        binhluan:req.body.binhluan
    }
    console.log(binhluan);
    Product.findById(id)
      .exec()
      .then(doc => {
        //console.log(doc);
        if (doc) {
            console.log(doc);
            // console.log("254"  + req.body);
          Product.updateOne({ _id: id }, { $push: { binhluans: binhluan } })
            .exec()
            .then(result => {
                console.log("doc:" + doc);
              doc.binhluans.push(binhluan);            
              res.status(200).json({
                status: 'success',
                message: 'commented on an product',
                event: doc
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        } else {
          res.status(404).json({ message: 'product does not exist' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });




router.delete('/:productId',checkAuth, (req, res, next) => {
   const id = req.params.productId;
    Product.remove( {_id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/products',
                    body: { name: 'String', price : 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            error: err
            })
        })
        
    
});

module.exports = router;