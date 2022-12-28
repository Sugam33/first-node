import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";

export const createProduct = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { productName, productBrand, productPrice, supplierName, ...rest } = req.body;
      try{
       const product = await Product.create({ productName, productBrand, productPrice, supplierName, ...rest});
       console.log(product);
       res.send({ status : "Product created!", product });
      }
      catch(err){
        console.log(err)
        res.send({ status: "error creating product!", err });
      }
    });

    export const listProducts = expressAsyncHandler(async(req,res) => {
        try{
          const products = await Product.find({});
          console.log(products);
          res.send({ status: "Product Listed!", products });
        } catch(err){
          console.log(err, ">>>> error");
          res.send({status: "error getting products!"});
        }
      });

      export const findProduct = expressAsyncHandler(async(req,res) => {
        const id = req.params.id;
        console.log(req.params, id);
        try{
          const product = await Product.findById(id);
          console.log(product);
          res.send({ status: "product data retrieved!", product});
        } catch(err){
          console.log(err, ">>>>>> error");
          res.send({ status: "error getting product data!" });
        }
      });

      export const deleteProduct = expressAsyncHandler(async(req, res) => {
        const id = req.params.id;
        console.log(req.params, id);
        try{
          const product = await Product.findOneAndDelete({_id : id});
          console.log(product);
          res.send({ status: "Product Deleted!", product});
        } catch(err){
          console.log(err, ">>>>> error");
          res.send({ status: "error deleting product data!"});
        }
      });

