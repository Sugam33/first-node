import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";
import User from "./model/users.js";

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

app.post("/api/users", async (req, res) => {
  console.log(req.body);
  const { fullName, email, password, ...rest } = req.body;
    try{
     const user = await User.create({ fullName, email, password, ...rest});
     console.log(user);
     res.send({ status : "User created!", user });
    }
    catch(err){
      console.log(err)
      res.send({ status: "error creating user!" });
    }

    app.get("/api/users", async(req,res) => {
      try{
        const users = await User.find({});
        console.log(users);
        res.send({ status: "User Listed!", users });
      } catch(err){
        console.log(err, ">>>> error");
        res.send({status: "error getting users!"});
      }
    });
    
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
