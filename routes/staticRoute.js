const express = require("express");
const router = express.Router();
const URLModel = require("../models/url")

router.get("/", async (req, res) => { //home
    if (!req.user) return res.redirect("/login");

    const allUrls = await URLModel.find({ createdBy: req.user._id});
    return res.render("home", {urls: allUrls});
})
router.get("/signup", async (req, res) => {
    return res.render("signup");
})
router.get("/login", async (req, res) => {
    return res.render("login");
})
router.get("/app", async (req, res) => {
    return res.render("app");
})

module.exports = router;