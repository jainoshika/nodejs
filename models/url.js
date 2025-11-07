const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortid: {
        type : String,
        required: true,
        unique:true,
    },
    redirectLink: {
        type : String,
        required: true,
    },
    visitHistory: [ { timestamps: { type: Number } } ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},{ timestamps: true });

const URLModel = mongoose.model("url", urlSchema)
module.exports = URLModel;