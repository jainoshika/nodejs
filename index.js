const express = require("express");
const PORT = 8001;
const app = express();
const { connectMongoDB } = require("./config/connections");
const path = require("path");
const cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth")
// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//ROUTES
const staticRoute = require("./routes/staticRoute");
const URLRoute = require("./routes/url");
const UserRoute = require("./routes/user");

//Connections
connectMongoDB("mongodb://127.0.0.1:27017/shorten-url");

//Model schema

//EJS - Server side rendering
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
    
//Routes -> Controllers
//TODO: shows shortids - redirect - counts
app.use("/url", restrictToLoggedinUserOnly, URLRoute);  // first visit, if /url in path
app.use("/user", UserRoute); //any request on userRoute - signup or login
app.use("/", checkAuth, staticRoute); // redirect from /app

app.listen(PORT, ()=>{console.log(`Server started at PORT ${PORT}`)});  