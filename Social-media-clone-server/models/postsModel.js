const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'allUsers' },
    postText: {
        required: true,
        type: String
    },
    photo: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    liked: Boolean,
    comments: Object
},
    {
        timestamps: true
    });

const postModel = new mongoose.model("posts", postSchema);

module.exports = postModel