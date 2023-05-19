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
            res.send({ redirectUrl: 'http://localhost:4200/dashboard' });
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

    // Perform any necessary processing or validation with the received form data

    // Example response
    const data = {
        name: name,
        number: number,
        email: email,
        password: password
    };

    try {
        // Insert the data into the collection using Mongoose's insertMany method
        await collection.insertMany([data]);

        // Render the "home" view if insertion is successful
        res.send({ redirectUrl: 'http://localhost:4200/dashboard' });
    } catch (error) {
        // Handle any error that occurred during insertion
        console.error(error);
        res.send("An error occurred during signup.");
    }
});

// Serve the static files from the Angular app
app.use(express.static(distPath));

// Catch-all route for Angular application
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../frontend/dist/task/index.html')));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
