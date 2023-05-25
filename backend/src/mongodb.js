const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/JioEVA")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("failed to connect");
    })

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true,

    }
})

const collection = new mongoose.model("user", LogInSchema)

module.exports = collection
