const express = require("express");
const userModel = require("../models/userModel");
const userController = {
    async store(req, res) {
        const myUser = new userModel(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
        );
        try {
            const dataToSave = await myUser.save();
            res.send(dataToSave);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    async allUser(req, res) {
        try {
            const allUsers = await userModel.find();
            res.json(allUsers);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}

module.exports = userController