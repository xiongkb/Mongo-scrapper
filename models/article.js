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
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

let Article = mongoose.model("Article", articleSchema);

module.exports = Article;