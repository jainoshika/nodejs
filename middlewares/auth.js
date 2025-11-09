const { findOneAndUpdate } = require("../models/user");
const { getUser } = require("../service/auth");

//SOFT CHECK 
function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;
    req.user = null;
    if (!token) return next(); // Allows both guests and logged-in users
    const user = getUser(token); //decoded payload or null, payload has mail and _id
    // if (!user) return res.redirect("/login"); // no user of this uid
    req.user = user;
    next();
}

//roles : {ADMIN, NORMAL}
function restrictTo(roles = []) {
    return function(req, res, next) {
        if (!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role)) return res.end("Unauthorised");
        return next();
    }
}

// async function checkAuth(req, res, next) {
//     const userUid =req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1]; 
//     const user = getUser(token);     
//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;
//     if (!userUid) return res.redirect("/login"); // no uid
//     const user = getUser(userUid); //decoded payload or null, payload has mail and _id
//     if (!user) return res.redirect("/login"); // no user of this uid
//     req.user = user;
//     next();
// }

