import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mediaSchema = new Schema(
    {
        url: {type: String},
        title: {type: String},
    },
    {
        timestamps: true
    }
)

const testSchema = new Schema(
    {
        title: {type: String},
        active: {type: Boolean},
        description: {type: String},
        media: [
            {
                url: String,
                title: String,
                votes: Number
            },
        ]
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
        media: [mediaSchema],
        tests: [testSchema]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User