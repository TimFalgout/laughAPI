import express from "express";
import axios from "axios";
import JokeAPI from 'sv443-joke-api';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
    res.render("index.ejs", {
        joke: null // No joke initially
    });
});

app.post("/submit", async (req, res) => {
    try {
        const jokeResponse = await axios.get(
            "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit"
        );

        const joke = jokeResponse.data;

        res.render("index.ejs", {
            joke: joke // Pass the new joke to the view
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})