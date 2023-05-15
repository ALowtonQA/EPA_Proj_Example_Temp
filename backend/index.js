"use strict";

// Setup
const MONGOOSE = require("mongoose");
const EXPRESS = require("express");
const CORS = require("cors");
const user_routes = require("./Routes/users");
const review_routes = require("./Routes/reviews");
const APP = EXPRESS();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/EPA";

// Middleware & Routes
APP.use(CORS());                       // Disable Cross Origin Resource Sharing Restrictions
APP.use(EXPRESS.json());              // JSON Body Parser
APP.use(user_routes);                // Routes for collections
APP.use(review_routes);             // ""

// Connect to MongoDB
MONGOOSE
    .connect(MONGO_URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connection Succesful");
    }).catch((err) => { 
        console.log("MongoDB Connection Failed!!!");
    });

// Listen for traffic on PORT
let server = APP.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App listening at http://localhost:${PORT}`);
    }
});

module.exports = server;
