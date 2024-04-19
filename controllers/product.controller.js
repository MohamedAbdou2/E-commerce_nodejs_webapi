const fs = require('fs/promises');
const multer = require('multer');
const upload = require('../middlewares/upload');
const productsmodel = require("../models/product.model");



const addProduct = async (req, res) => {
    try {
        
        upload.single('photo')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                
                return res.status(500).json({ message: "Multer error" });
            } else if (err) {
                
                return res.status(500).json({ message: "Unknown error" });
            }
           
           const { name, description } = req.body;
  
           const sellerIdentity = req.id;
            const photo = req.file.filename; 
  
              try {
                let product = await productsmodel.create({
                    name,
                    description,
                    photo,
                    sellerIdentity
                });
  
                return res.status(201).json({ message: "Product created successfully", data: product });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error creating product" });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }


};

const getAllProducts = async (req, res) => {

    try {
        let products = await productsmodel.find().populate('sellerIdentity');
        return res.status(200).json({ message: "Products fetched successfully", data: products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching products" });
    }


};

// const getProductById = async (req, res) => {
//     try {
//         let product = await productsmodel.findById(req.params.id).populate('sellerIdentity');
//         return res.status(200).json({ message: "Product fetched successfully", data: product });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Error fetching product" });
//     }
// };

const getProductByName = async (req, res) => {

    try {
        let product = await productsmodel.findOne({ name: req.params.name }).populate('sellerIdentity');
        return res.status(200).json({ message: "Product fetched successfully", data: product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching product" });
    }


};

const getProductBySellerId = async (req,res)=>{
    try {
        let products = await productsmodel.find({sellerIdentity:req.params.id}).populate('sellerIdentity');
        return res.status(200).json({ message: "Products fetched successfully", data: products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching products" });
    }
};


const getsellerPrducts = async (req, res) => {

    try {
        let products = await productsmodel.find({sellerIdentity:req.id});
        products.length > 0 && res.status(200).json({ data: products})
        products.length == 0 && res.status(200).json({ message: "Couldn't find any products for " + req.id })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching products" });
    }
};

const updateProduct = async (req, res) => {
    try {
        // Trim the id to remove any leading or trailing spaces
        const trimmedId = req.params.id.trim();

        // Use the trimmed id to find and update the product
        let product = await productsmodel.findByIdAndUpdate(trimmedId, req.body, { new: true });
        return res.status(200).json({ message: "Product updated successfully", data: product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating product" });
    }
};


const deleteProduct = async (req, res) => {
    let { id } = req.params;
    try {
        
        const deletedproduct = await productsmodel.findByIdAndDelete(id);

        if (deletedproduct) {
            
            await fs.unlink(`uploads/${deletedproduct.photo}`);

            res.status(200).json({ "message": `Product and its photo deleted successfully` });
        } else {
            res.status(404).json({ "message": `Product not found with ID: ${id}` });
        }
    } catch (error) {
        res.status(422).json({ "message": error.message });
    }
};
module.exports = {addProduct,getAllProducts,getProductByName,getProductBySellerId,getsellerPrducts,updateProduct,deleteProduct};

