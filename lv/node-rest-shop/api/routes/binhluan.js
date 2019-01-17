const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../midddleware/check-auth');





const BinhLuan = require('../model/binhluan');
router.get('/', (req, res, next) => {
    BinhLuan.find()
    .select('_id userName binhluan date')
    .exec()
    .then(docs => {
       const reponse = {
           count: docs.length,
           binhluan: docs.map( doc =>{
               return {
                   userName:doc.userName,
                   _id:doc._id,
                  binhluan:doc.binhluan,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:4000/binhluan/' + doc._id
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

router.post('/',checkAuth ,(req, res, next) => {
 let date = new Date().toString().replace(/:/g, '-');

 console.log('day la req: ' +req);
    const binhluan = new BinhLuan({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        binhluan:req.body.binhluan,
        date:date
    });
    binhluan.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Binh luan thanh cong',
            binhluan: {
                userName: result.userName,
                binhluan:result.binhluan,
                date:result.date,
                _id:result._id,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:4000/binhluan/' + result._id
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



router.delete('/:binhluanId',checkAuth, (req, res, next) => {
   const id = req.params.binhluanId;
    BinhLuan.remove( {_id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Binh Luan deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/binhluan',
                    body: { userName: 'String', binhluan : 'String'}
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