// creating a table for comments that use will input
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    body: String
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;