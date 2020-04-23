// creating the routes
const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function(app) {
    // axios get to scrape the website
    app.get("/scrape", function(req, res) {
        axios.get("https://na.finalfantasyxiv.com/lodestone/news/").then(function(response) {
            let $ = cheerio.load(response.data);
            console.log(" {{-{{ THIS IS INSIDE AXIOS }}-}}");
            
            // scrapping the site for articles
            $("li.news__list--topics").each(function(i, element) {
                let result = {};

                // scrapping for info needed
                
                result.title = $(element).find(".news__list--header").find("a").text();
                result.summary = $(element).find("div").find("p.mdl-text__xs-m16").text();
                result.link = "https://na.finalfantasyxiv.com" + $(element).find(".news__list--title").find("a").attr("href");
                console.log(result);
                // adding to db
                // db.Article.create(result).then(function(data) {
                //     console.log(data);
                //     res.sendStatus(200);
                // }).catch(function(err) {
                //     console.log(err);
                // });
            });
            
            res.send("scrape completed");
        });
    });

    //  homepage
    app.get("/", function(req,res) {
        res.render("index");
    });
    
    // getting the news topics
    app.get("/articles", function(req, res) {
        db.Article.find({}).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // finding the specific topic
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("comment").then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // updating the comment associated with the article
    app.get("/articles/:id", function(req, res) {
        db.Comments.create(req.body).then(function(data) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: data._id }, { new: true });
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });
};