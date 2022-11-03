import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 5000;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const data = [
  {
    title: "adipiscing elit",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "amet",
    note: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "nostrud",
    note: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  },
  {
    title: "minimminim",
    note: "Ut enim ad minimminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
];

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
  res.send("available endpoints /sendnotes, /receivenotes");
});

app.get("/receivenotes", (req, res) => {
  res.send({ notes: data });
});

app.post("/sendnotes", (req, res) => {});

app.listen(port, function () {
  console.log("The server is now started at port" + port);
});
