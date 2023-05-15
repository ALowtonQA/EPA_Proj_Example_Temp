"use strict";

// Setup
const router = require("express").Router();
const user = require("../Models/user");

// // Get Requests (200 is default HTTP status code)
router.post("/user/login", async(req, res, next) => {
    try {
        const existing = await user.exists({username: req.body.username, password: req.body.password});
        if (existing) {
            res.send(existing);
        } else {
            res.status(404).send();
        }   
    } catch(err) {
        next(new Error(err.message));
    }
});

// Post Requests
router.post("/user/register", async(req, res, next) => {
    const newUser = new user(req.body);
    try {
        const created = await newUser.save();
        res.status(201).send(created);
    } catch(err) {
        next(new Error(err.message));
    }
});

// Patch Requests
router.patch("/user/updateP", async(req, res, next) => {
    const filter = { username: req.body.username};
    try {
        const updated = await user.findOneAndUpdate(filter, {password: req.body.password});
        res.send(updated);
    } catch(err) {
        next(new Error(err.message));
    }
});

router.patch("/user/updateU", async(req, res, next) => {
    const filter = { username: req.body.oldUsername};
    try {
        const updated = await user.findOneAndUpdate(filter, {username: req.body.newUsername});
        res.send(updated);
    } catch(err) {
        next(new Error(err.message));
    }
});

// Delete Requests
router.delete("/user/delete/:username", async(req, res, next) => {
    const conditions = { username: req.params.username};
    try {
        const deleted = await user.findOneAndDelete(conditions);
        if (deleted) {
            res.send(deleted);
        } else {
            res.status(404).send();
        }
    } catch(err) {
        next(new Error(err.message));
    }
});

// Export
module.exports = router;