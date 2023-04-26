const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// define the Flashcard schema
const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  mastered: Boolean,
  cycled: Number
});

// create a model for Flashcard
const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// connect to the MongoDB database
mongoose.connect("mongodb://mongodb:27017/flashcards", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// handle GET requests for all flashcards
app.get("/flashcards", async (req, res) => {
  try {
    const flashcards = await Flashcard.find({});
    res.json(flashcards);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
