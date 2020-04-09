// creating a table for articles
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.types.ObjectId
        ref: "comment"
    }
});

let Artical = mongoose.model("Article", articleSchema);

module.exports = articleSchema;