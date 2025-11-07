const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

router.post("/", handleUserSignup) // /user/ 
router.post("/login", handleUserLogin) ///user/login - route

module.exports = router;