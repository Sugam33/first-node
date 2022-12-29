import express from "express";
import {
    createUser,
    deleteUsers,
    getUsers,
    registerUser
} from "../controllers/usersController.js"

const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(createUser);
userRouter.route("/:id").get(getUsers).delete(deleteUsers);

export default userRouter;