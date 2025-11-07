const User = require("../models/user");
const { v4: uuidv4} = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    await User.create({ // creating schema type data in db
        name, 
        email,
        password,
    });
    return res.render("login"); // http://localhost:8001/user
}
//application use only after login, data from frontend - email, password
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid email or password"
        })
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/"); //root page which is main application
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
}