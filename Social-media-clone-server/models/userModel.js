const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    // posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }]
},
    {
        timestamps: true
    });

const userModel = new mongoose.model("allUsers", userSchema);

module.exports = userModel