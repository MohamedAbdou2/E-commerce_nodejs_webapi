const orderModel = require('../models/order.model');

const createOrder = async (req, res) => {
    try{
        let order = req.body;
        order.userId = req.id;
        const newOrder = await orderModel.create(order);
        res.status(201).json(newOrder);
    } catch(err){
        next(err);
    }
};

const getAllOrders = async (req, res) => {
    try{
        const orders = await orderModel.find().populate('products').populate('userIdentity');
        res.status(200).json({message:"all products got success",data:orders});
    } catch(err){
       return res.status(500).json({message:err.message});
    }
};

const getOrderById = async (req, res) => {
    try{
        const order = await orderModel.findById(req.params.id).populate('products').populate('userIdentity');
        if(order){
            res.status(200).json(order);
        }
        else{
            res.status(404).json({message:"order id not found"});
        }
    } catch(err){
        return res.status(500).json({message:err.message});
    }
};

const updateOrderById = async (req, res) => {
    try{
        const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(order){
            res.status(200).json(order);
        }
        else{
            res.status(404).json({message:"order id not found"});
        }
    } catch(err){
        return res.status(500).json({message:err.message});
    }
};

const deleteOrderById = async (req, res) => {
    try{
        const order = await orderModel.findByIdAndDelete(req.params.id);
        if(order){
            res.status(200).json({message:"order deleted successfully"});
        }
        else{
            res.status(404).json({message:"order id not found"});
        }
    } catch(err){
        return res.status(500).json({message:err.message});
    }
};


module.exports = {createOrder,getAllOrders,getOrderById,updateOrderById,deleteOrderById};