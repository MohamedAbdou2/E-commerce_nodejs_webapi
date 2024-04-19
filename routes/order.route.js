const express = require('express');
let router = express.Router();

const {createOrder,getAllOrders,getOrderById,updateOrderById,deleteOrderById} = require('../controllers/order.controller');


const {auth, restrictTo} = require('../middlewares/auth');


router.route('/').post(auth,restrictTo('User'),createOrder);

router.route('/').get(auth,restrictTo('User'),getAllOrders);

router.route('/:id').get(auth,restrictTo('User'),getOrderById);

router.route('/:id').put(auth,restrictTo('User'),updateOrderById);

router.route('/:id').delete(auth,restrictTo('User'),deleteOrderById);


module.exports = router;
