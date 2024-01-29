
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    imdbID: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Movie = mongoose.model('movie', MovieSchema);
Movie.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
});

app.post("/wishlist", async (req, resp) => {
    try {
        const movie = new Movie(req.body);
        let result = await movie.save();
        result = result.toObject();
        if (result) {
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("Movie already wishlist");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
app.get("/getwatchlist", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.listen(5000);
