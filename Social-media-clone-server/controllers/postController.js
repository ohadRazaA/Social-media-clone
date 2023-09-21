const express = require("express");
const mongoose = require('mongoose');
const postModel = require("../models/postsModel");

const postController = {
    async store(req, res) {
        const post = new postModel(
            {
                user_id: req.body.userId,
                postText: req.body.postText,
                photo: req.body.photo,
                date: req.body.date,
                comments: req.body.comments,
                liked: req.body.liked,
            }
        );
        try {
            const dataSave = await post.save();
            res.send(dataSave);
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    async allPost(req, res) {
        try {
            const selectedPost = await postModel.find().populate("user_id");
            res.send(selectedPost);
        }
        catch (err) {
            res.status(500).json({message: err.message})
        }
    }

}

module.exports = postController