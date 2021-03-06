const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../midddleware/check-auth');

const User = require('../model/user');
router.get('/',checkAuth, (req, res, next) => {
const bearerHeader = req.headers['authorization'];
const bearer = bearerHeader.split(' ')
// Get token from array
const bearerToken = bearer[1];
//Set the token
req.token = bearerToken;
jwt.verify(req.token, process.env.JWT_KEY, (err, decode) => {
    if (decode) {
        res.status(200).json({
            user: decode,
            status: 'success'
        })
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'token invalid',
            error: err
        })
    }
})
    
});
router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >=1){
            return res.status(422).json({
                message:" Mail exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        userName:req.body.userName
                     });
                     user.save()
                     .then(result => {
                         console.log(result);
                         res.status(201).json({
                             message: "User created"
                         });
                     })
                     .catch( err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                     })
                }
            })
        }
    })
    
     
});
router.post('/login',(req, res, next) =>{
    User.find({ email: req.body.email}).exec()
    .then( user => {
        if (user.length < 1) {
            return res.status(404).json({
                message:'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if (err){
                return res.status(404).json({
                    message:'Mail or password not found'
                });
            }
            if(result){
                console.log(user);
               const token =  jwt.sign({
                    email: user[0].email,
                    userName:user[0].userName,
                    userId: user[0]._id,
                
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    comein:1,
                    token:token
                });
            }
            return res.status(200).json({
                message:'Mail or password not found',
                comein:0,

            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: err
        })
    })
})
router.delete('/:userId', (req, res, next) =>{
    User.remove({ _id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: err
        })
    })
})
module.exports = router;