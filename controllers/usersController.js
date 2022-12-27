import expressAsyncHandler from "express-async-handler";
import User from "../model/users.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
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
    });

    export const createUser = expressAsyncHandler(async(req,res) => {
        try{
          const users = await User.find({});
          console.log(users);
          res.send({ status: "User Listed!", users });
        } catch(err){
          console.log(err, ">>>> error");
          res.send({status: "error getting users!"});
        }
      });

      export const getUsers = expressAsyncHandler(async(req,res) => {
        const id = req.params.id;
        console.log(req.params, id);
        try{
          const user = await User.findById(id);
          console.log(user);
          res.send({ status: "User data retrieved!", user});
        } catch(err){
          console.log(err, ">>>>>> error");
          res.send({ status: "error getting user data!" });
        }
      });

      export const deleteUsers = expressAsyncHandler(
        async(req, res) => {
            const id = req.params.id;
            console.log(req.params, id);
            try{
              const user = await User.findOneAndDelete({_id : id});
              console.user(user);
              res.send({ status: "User Deleted!", user});
            } catch(err){
              console.log(err, ">>>>> error")
              res.send({ status: "error deleting user data!"});
            }
          });

    // export { registerUser }