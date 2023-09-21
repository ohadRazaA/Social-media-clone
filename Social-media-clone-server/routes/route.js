const express = require("express");
const userController = require("../controllers/userController");
const authUserController = require("../controllers/authUserController");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/user", userController.store);
router.get("/user", userController.allUser);

router.post("/authenticate-user", authUserController.authenticateUser);

router.post("/home", postController.store);
router.get("/home", postController.allPost);

module.exports = router;