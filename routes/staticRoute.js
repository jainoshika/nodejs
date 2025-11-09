const express = require("express");
const router = express.Router();
const URLModel = require("../models/url")
const { restrictTo } = require("../middlewares/auth")

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => { //home : now the flwo of mw and func - restrictTo -> then get route
    const allUrls = await URLModel.find();
    return res.render("home", {urls: allUrls}); //show my urls
})

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => { //home : now the flwo of mw and func - restrictTo -> then get route
    const allUrls = await URLModel.find({ createdBy: req.user._id});
    return res.render("home", {urls: allUrls}); //show my urls
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