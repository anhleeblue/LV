const express = require('express');
const router = express.Router();

router.get('/', (req, res ,next) => {
    res.status(200).json({
        message: ' Handling Get request to /products'
    });
});
router.post('/', (req, res ,next) => {
    const product = {
        name:req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: ' Handling Post request to /products',
        createdProduct: product
    });
});

router.get('/:productId',(req,res, next) => {
    const id = req.params.productId;
    if(id === 'special') {
        res.status(200).json({
            message: "You discovered the special ID",
            id
        });
    }else{
        res.status(200).json({
            message: "You passed an ID"
        })
    }
})
module.exports = router 