const express = require("express");
const userModel = require("../models/userModel");
const authUserController = {
    async authenticateUser(req, res) {
        const userEmail = req.body.userEmail;
        const password = req.body.password;

        const myUserFound = await userModel.findOne({ email: userEmail, password: password });

        if (myUserFound) {
            if (myUserFound.password === password && myUserFound.email === userEmail) {
                res.json({ message: 'Authentication successful' });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    }
}

module.exports = authUserController