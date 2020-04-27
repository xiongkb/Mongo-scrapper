// creating the routes
const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function(app) {
    // axios get to scrape the website
    app.get("/scrape", function(req, res) {
        // db.Article.deleteMany({}).then(function(deleted, err){
        //     if (err) {
        //         console.log(err);
        //     };
        //     console.log(deleted);
            axios.get("https://na.finalfantasyxiv.com/lodestone/news/").then(function(response) {
                let $ = cheerio.load(response.data);
                
                // scrapping the site for articles
                $("li.news__list--topics").each(function(i, element) {
                    let result = {};

                    // scrapping for info needed
                    result.title = $(element).find(".news__list--header").find("a").text();
                    result.summary = $(element).find("div").find("p.mdl-text__xs-m16").text();
                    result.link = "https://na.finalfantasyxiv.com" + $(element).find(".news__list--title").find("a").attr("href");
                    
                    // adding to db
                    db.Article.create(result).then(function(data) {
                    //     console.log("*++*+*+*+*+*+* CREATING RESULTS *+*+*+*+*+*+*+")
                    //     console.log(data);
                    res.status(200).end();
                    }).catch(function(err) {
                        res.status(500).send(err);
                        console.log(err);
                    });
                });
            });
        // });
    });

    //  homepage
    app.get("/", function(req,res) {
        res.render("index");
    });
    
    // getting the news topics
    app.get("/articles", function(req, res) {
        db.Article.find({}).then(function(data) {
            res.send(data);
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
    app.post("/articles/:id", function(req, res) {
        console.log(req.body);
        db.Comment.create(req.body)
            .then(function(data) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: data._id }, { new: true });
            }).then(function(data) {
                res.json(data);
            }).catch(function(err) {
                res.json(err);
            });
    });
};