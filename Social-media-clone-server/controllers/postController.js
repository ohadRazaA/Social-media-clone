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
            res.status(500).json({ message: err.message })
        }
    },
    async addComment(req, res) {
        try {
            const updatedPost = await postModel.findByIdAndUpdate(
            {_id: req.params.id},
            { $push: { comments: req.body.comment } }
        );

        res.json(updatedPost);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async addLike(req, res) {
        try {
            const updatedPost = await postModel.findByIdAndUpdate(
            {_id: req.params.id},
            { $set: { liked: req.body.liked } },
        );

        res.json(updatedPost);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = postController