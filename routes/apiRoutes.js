const axios = require("axios");
const router = require("express").Router();

router.get("/search", (req, res) => {
    axios
        .get("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q + "&maxResults=10&printType=books&key=" + process.env.API_KEY)
        .then((results) => res.json(results.data))
        .catch(err => res.status(422).json(err));
});

module.exports = router;