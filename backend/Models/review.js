"use strict";

// Setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const review_schema = new schema({
    book_title: String,
	body: String,
	author: String,
    user: String,
    date: Date
});

module.exports = mongoose.model("Review", review_schema);
