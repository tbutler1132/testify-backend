import mongoose from 'mongoose'

const Schema = mongoose.Schema

const testSchema = new Schema(
    {
        title: {type: String},
        active: {type: Boolean},
        description: {type: String},
        audio: [{
            title: String,
            file: String,
            votes: Number
        }]
    },
    {
        timestamps: true
    }
)

const userSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        username: {type: String, required: true},
        votes: {type: Number},
        link: {type: String},
        tests: [testSchema]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User