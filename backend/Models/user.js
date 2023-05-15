"use strict";

// Setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const user_schema = new schema({
	username: {
		type: String,
		unique: true
	},
	password: String
});

module.exports = mongoose.model("User", user_schema);
