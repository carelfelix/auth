import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak Cocok!"});
    const hashedPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateUser = (req, res) =>{

}

export const deleteUser = (req, res) =>{

}