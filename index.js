import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";
import User from "./model/users.js";
import Product from "./model/product.js";
import { createUser, deleteUsers, getUsers, registerUser } from "./controllers/usersController.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
console.log("Hello")
app.get("/",(req,res) => {
    res.send("API is running...")
});
app.post("/test", (req,res) => {
    console.log(req.body, "test")
    res.status(200).send(req.body)
});

app.post("/api/users", registerUser);

app.get("/api/users", createUser);
    
app.get("/api/users/:id", getUsers);

app.delete("/api/users/:id", deleteUsers);

    // app.post("/login", async(req, res) => {
    //   const { email, password } = req.body;
    //   try{
    //     const user = User.find
    //   } catch(err){} 
    // });
    

// products

app.post("/api/product", async (req, res) => {
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

    app.get("/api/product", async(req,res) => {
      try{
        const products = await Product.find({});
        console.log(products);
        res.send({ status: "Product Listed!", products });
      } catch(err){
        console.log(err, ">>>> error");
        res.send({status: "error getting products!"});
      }
    });
    
    app.get("/api/product/:id", async(req,res) => {
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

    app.delete("/api/product/:id", async(req, res) => {
      const id = req.params.id;
      console.log(req.params, id);
      try{
        const product = await Product.findOneAndDelete({_id : id});
        console.user(product);
        res.send({ status: "Product Deleted!", product});
      } catch(err){
        console.log(err, ">>>>> error")
        res.send({ status: "error deleting product data!"});
      }
    });
    


(async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  })();

 

app.listen(3005, console.log("Serving..."))
