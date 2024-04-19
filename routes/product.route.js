const express = require('express');
let router = express.Router();

const {addProduct,getAllProducts,getProductByName,getProductBySellerId,getsellerPrducts,updateProduct,deleteProduct} = require('../controllers/product.controller');
const {auth, restrictTo} = require('../middlewares/auth');


router.route('/').post(auth,restrictTo('Seller'),addProduct).get(getAllProducts);

router.route('/search/:name').get(getProductByName);

router.route('/seller/:id').get(auth,restrictTo('Seller','User'),getProductBySellerId);

router.route('/search').get(auth,getsellerPrducts);

router.route('/:id').put(auth,restrictTo('Seller'),updateProduct).delete(auth,restrictTo('Seller'),deleteProduct);

module.exports = router;