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

export const uploadMedia = async (req, res) => {
    const { id } = req.params
    const { files, title } = req.body
    console.log(title)
    //Put the file in the body
    //The title in the body
    try {
        const uploadedResponse = await cloudinary.uploader.upload(files, "dev_setups", {
            resource_type: "video"
        })
        const { secure_url } = uploadedResponse
        const user = await User.findById(id)
        user.media.push({url: secure_url, title: title})
        user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log("Error")
    }
}

export const createTest = async (req, res) => {
    const test = req.body
    const id = req.params.id
    try {
        const user = await User.findById(id)
        user.tests.push(test)
        await user.save()
        res.status(200).json(test)
    } catch (error) {
        console.error(error)
    }
}

export const getRandomTest = async (req, res) => {
    
    try {
        const count = await User.estimatedDocumentCount()
        const random = Math.floor(Math.random() * count)
        const user = await User.findOne().skip(random)
        const random2 = Math.floor(Math.random() * user.tests.length)
        const { media, _id } = user.tests[random2]
        res.status(200).json({
            media,
            testId: _id,
            userId: user._id
        })
    } catch (error) {
        console.log(error)
    }


    // collection.find({ arrayElementName: { $exists: true, $not: {$size: 0} } })

    //Find documents where value does not equal passed in value
    // { field: { $ne: value } }
}

// export const getTests = async (req, res) => {
//     id = req.params.id
//     try {
        
//     } catch (error) {
        
//     }
// }
