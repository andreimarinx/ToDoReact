const { json } = require('express')
const mongoose = require('mongoose')

const Tasks = new mongoose.Schema({
    taskName: {
        required: true,
        type: String
    }
})

const User = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    tasks: [Tasks]
})
module.exports = mongoose.model("User", User)