// creating the routes
const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function(app) {
    // axios get to scrape the website
    app.get("/scrape", function(req, res) {
        axios.get("https://na.finalfantasyxiv.com/lodestone/news/").then(function(response) {
            let $ = cheerio.load(response.data);
            // scrapping the site for articles
            $("li p.news__list--title").each(function() {
                let result = {};
                // scrapping for info needed
                result.title = $(this).children("header").children("p.news__list--title").text();
                result.summary = $(this).children("div").children("p.mdl-text__xs-m16").text();
                result.link = "https://na.finalfantasyxiv.com/" + $(this).children().attr("href");
                // adding to db
                db.Article.create(result).then(function(data) {
                    console.log(data);
                }).catch(function(err) {
                    console.log(err);
                });
            });
        });
    });
    app.get("/", function(req,res) {
        res.render("index");
    })
};