"use strict";

// Setup
const router = require("express").Router();
const review = require("../Models/review");

// Get Requests (200 is default HTTP status code)
router.get("/review/getAll", async(req, res, next) => {
    try {
        const reviews = await review.find();
        res.send(reviews);
    } catch(err) {
        next(new Error(err.message));
    }
});

router.get("/review/get/:id", async(req, res, next) => {
    try {
        console.log(req.params.id);
        const found = await review.findById(req.params.id);

        if (found) 
            res.send(found);
        else 
            res.status(404).send();
    
    } catch(err) {
        next(new Error(err.message));
    }
});

// Post Requests
router.post("/review/create", async(req, res, next) => {
    const newReview = new review(req.body);
    try {
        const created = await newReview.save();
        res.status(201).send(created);
    } catch(err) {
        next(new Error(err.message));
    }
});

// Patch Requests
router.put("/review/update/:id", async(req, res, next) => {
    const filter = { _id: req.params.id };
    try {
        const updated = await review.findOneAndReplace(filter, req.body);

        if (updated) 
            res.send(updated);
        else 
            res.status(404).send();

    } catch(err) {
        next(new Error(err.message));
    }
});

// Delete Requests
router.delete("/review/delete/:id", async(req, res, next) => {
    const filter = { _id: req.params.id };
    try {
        const deleted = await review.findOneAndDelete(filter);

        if (deleted) 
            res.send(deleted);
        else 
            res.status(404).send();
        
    } catch(err) {
        next(new Error(err.message));
    }
});

// Export
module.exports = router;