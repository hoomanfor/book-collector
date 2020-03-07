const axios = require("axios");
const router = require("express").Router();
const Book = require("../models/book.js");

router.get("/search", (req, res) => {
    axios
        .get("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q + "&maxResults=10&printType=books&key=" + process.env.API_KEY)
        .then((results) => res.json(results.data))
        .catch(err => res.status(422).json(err));
});

router.get("/books", (req, res) => {
    Book.find()
    .then((books) => {
        res.json(books)
    });
});

router.post("/books", (req, res) => {
    Book.create(req.body)
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;