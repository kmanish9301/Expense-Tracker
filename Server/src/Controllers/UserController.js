import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import { createUserValidationSchema } from "../Utils/Validators.js";
import { generateToken } from "../Utils/Middleware.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: true, message: "No request body" });
    }

    const validateUserData = await createUserValidationSchema.validate(req.body, {
        abortEarly: false
    });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({
            error: true,
            message: "User with this email already exists."
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userdata = await User.create({
        user_name: validateUserData.user_name,
        email: validateUserData.email,
        password: hashedPassword,
        role: validateUserData.role
    })

    const accessToken = generateToken(userdata.toJSON(), process.env.ACCESS_TOKEN_SECRET, process.env.JWT_ACCESS_EXPIRATION);
    const refreshToken = generateToken(userdata.toJSON(), process.env.REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_EXPIRATION);

    userdata.accessToken = accessToken;
    userdata.refresh_token = refreshToken;
    await userdata.save();

    return res.status(200).json({
        message: "User created successfully",
        user_details: {
            id: userdata.id,
            user_name: userdata.user_name,
            email: userdata.email,
            role: userdata.role,
            // refreshToken: userdata.refresh_token
        }
    })
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
    const user = await User.findAll()
    if (!user) {
        return res.status(404).json({ error: true, message: "User not found" });
    }

    const usersData = user.map(user => ({
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }))

    return res.status(200).json({
        success: true, count: usersData.length, results: usersData
    })
})

export const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({ error: true, message: "User not found" });
    }

    const user_details = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }

    return res.status(200).json({
        success: true, user_details: user_details
    })
})

export const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({ error: true, message: "User not found" });
    }

    await user.destroy();
    return res.status(200).json({ success: true, message: "User deleted successfully" });
})