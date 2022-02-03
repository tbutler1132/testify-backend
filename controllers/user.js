import User from '../models/User.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js'
dotenv.config()

const jwtSecret = process.env.JWT_TOKEN

export const signin = async (req, res) => {

    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json("User does not exist")

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json('Invalid Credentials')

        const token = jwt.sign({email: existingUser.email, _id: existingUser._id}, jwtSecret, {expiresIn: "1h"})

        return res.status(200).json({result: existingUser, token})
    } catch (error) {
        return res.status(500).json('Woops')
        
    }
}

export const signup = async (req, res) => {
    const {email, password, username} = req.body

    try {
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json("User exists")

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, username})

        const token = jwt.sign({email: result.email, _id: result._id}, jwtSecret, {expiresIn: "1h"})

        return res.status(200).json({result, token})
    } catch (error) { 
        console.log("ERROR", error)
        return res.status(500).json('Woops')
    }
}

export const createUser = async (req, res) => {
    const {username, password, email } = req.body
    const newUser = new User({
        username,
        password,
        email,
    });
    try {
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}



export const createTest = async (req, res) => {
    const fileString = req.body.files 
    try {
        const uploadedResponse = await cloudinary.uploader.upload(fileString, "dev_setups", {
            resource_type: "video"
        })
        console.log(uploadedResponse)
    } catch (error) {
        console.error(error)
    }
}
