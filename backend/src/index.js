const express = require("express");
const app = express();
const path = require("path");
const distPath = path.join(__dirname, '../../frontend/dist/task');
const collection = require("./mongodb");
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes
app.use(cors());

app.post('/api/login', async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });

        if (check && check.password === req.body.password) {
            if (check && check.otp === req.body.otp) {
                res.send({ redirectUrl: '/dashboard' });
            }
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        res.send("Wrong details");
    }
});

app.post('/api/signup', async (req, res) => {
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    const password = req.body.password;
    otp_user = Math.floor(100000 + Math.random() * 900000).toString(); // Assign value to otp_user

    const data = {
        name: name,
        number: number,
        email: email,
        password: password,
        otp: otp_user
    };

    try {
        await collection.insertMany([data]);

        res.send({ otp: otp_user });
    } catch (error) {
        console.error(error);
        res.send("An error occurred during signup.");
    }
});


app.use(express.static(distPath));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../frontend/dist/task/index.html')));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
