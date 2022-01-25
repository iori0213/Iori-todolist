import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";
//create a router with express.Router()
const router = express.Router();

//===========login authentication=========================
router.post("/login/:userName", async (req, res) => {
    const userRepo = getRepository(User);
    const postUserName = req.params.userName;
    const result = await userRepo.findOne({
        userName: postUserName,
    })
    if (result) {
        return res.json({
            account_status: true,
            userID: result.id,
            userName: result.userName,
        })
    } else {
        return res.json({
            account_status: false,
            message: "the account is not existed, please register your account.",
        })
    }
})
//==========register account===============================
router.post("/register/:userName", async (req, res) => {
    const postUserName = req.params.userName;
    const userRepo = getRepository(User);
    const result = await userRepo.findOne({
        userName: postUserName,
    })
    if (result) {
        return res.json({
            register_status: false,
            message: "User name existed. Please login.",
        })
    } else {
        const newUser = new User();
        newUser.userName = postUserName;
        await userRepo.save(newUser);
        return res.json({
            register_status: true,
            message: "Register process finished."
        })
    }
})
//==========get all the users=============================
router.get("/", async (_, res) => {
    const userRepo = getRepository(User);
    const result = await userRepo.find();
    if (result) {
        return res.json({
            result
        })
    } else {
        return res.json({
            message: "No user existed."
        })
    }
})
export { router as userRouter }