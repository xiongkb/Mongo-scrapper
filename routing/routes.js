// creating the routes
const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function(app) {
    // axios get to scrape the website
    app.get("/scrape", function(req, res) {
        console.log("+++++++++++hi++++++++++++")
        axios.get("https://na.finalfantasyxiv.com/lodestone/news/").then(function(response) {
            // console.log(response);
            let $ = cheerio.load(response.data);
            // scrapping the site for articles
            $("li p.news__list--title").each(function(i, element) {
                let result = {};
                // scrapping for info needed
                result.title = $(element).children("header").children("p.news__list--title").text();
                result.summary = $(element).children("div").children("p.mdl-text__xs-m16").text();
                result.link = "https://na.finalfantasyxiv.com/" + $(element).children().attr("href");
                // adding to db
                db.Article.create(result).then(function(data) {
                    console.log(data);
                    res.sendStatus(200);
                }).catch(function(err) {
                    console.log(err);
                });
            });
        });
    // });
    // app.get("/", function(req,res) {
    //     res.render("index");
    })
};