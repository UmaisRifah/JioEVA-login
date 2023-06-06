const mongoose = require("mongoose");

const isDocker = process.env.DOCKER_ENV === 'true';

let connectionString;

if (isDocker) {
    connectionString = 'mongodb://host.docker.internal:27017/JioEVA';
} else {
    connectionString = 'mongodb://localhost:27017/JioEVA';
}

mongoose.connect(connectionString)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB:', error);
    });

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
    otp: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("user", LogInSchema);

module.exports = collection;
