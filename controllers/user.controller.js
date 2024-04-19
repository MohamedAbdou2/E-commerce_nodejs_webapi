const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const addUser = async (req,res,next) => {
    try {
        let user = req.body;
        let newUser = await userModel.create(user);
        res.status(201).json({message:"new user added successfully",data:newUser});
    } catch (err) {
        next(err);
    }

};

const getAllUsers = async (req,res) => {
    try {
        let users = await userModel.find();
        res.status(200).json({message:"users fetched successfully",data:users});
    } catch (err) {
        res.status(500).json({massege: err})
    }
};

const getUserById = async (req,res) => {
    try {
        let user = await userModel.findById(req.params.id);
        res.status(200).json({message:"user fetched successfully",data:user});
    } catch (err) {
        res.status(500).json({massege: err})
    }
};

const updateUserById = async (req,res) => {
    try {
        let user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(user) {
            res.status(200).json({message:"user updated successfully",data:user});
        }
        else {
            res.status(404).json({message:"user not found"});
        }
    } catch (err) {
        res.status(500).json({massege: err})
    }
};

const deleteUserById = async (req,res) => {
    try {
        let user = await userModel.findByIdAndDelete(req.params.id);
        if(user) {
            res.status(200).json({message:"user deleted successfully"});
        }
        else {
            res.status(404).json({message:"user not found"});
        }
    } catch (err) {
        res.status(500).json({massege: err})
    }
};

const login = async (req, res) => {
    let {email, password} = req.body;
    if (!email||!password) {
       return res.status(400).json({message:"email and password are required"});   
    }

    try {
        let user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({message:"user not found"});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message:"password is incorrect"});
        }
        let token =  await  jwt.sign({data : {email : user.email, id: user._id, role : user.role}}, process.env.JWT_SECRET   ,{expiresIn: '1h'})

        res.status(200).json({message:"login successful",token});
    } catch (err) {
        console.error(err); // Log the error for debugging

        res.status(500).json({massege:'login failed'})
    }

    
};

module.exports = {addUser,getAllUsers,getUserById,updateUserById,deleteUserById,login};