import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

mongoose.connect("mongodb://127.0.0.1:27017/notesDB");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

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

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
  res.send("available endpoints /sendnotes, /receivenotes");
});

app.get("/receivenotes", (req, res) => {
  Note.find({}, (err, foundNotes) => {
    if (foundNotes) {
      res.send(JSON.stringify({ notes: foundNotes }));
    } else {
      res.send(JSON.stringify({ notes: [] }));
    }
  });
});

app.get("/deletenote", (req, res) => {
  Note.findByIdAndDelete(req.query._id, (err, doc) => {
    if (err) {
      res.json({ success: false, message: "Gives error" });
    } else {
      res.json({ success: true, doc: doc });
    }
  });
});

app.post("/sendnote", (req, res) => {
  Note.create(req.body, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Gives error" });
    } else {
      res.json({ success: true, data: data });
    }
  });
});

app.post("/updatenote", (req, res) => {
  Note.findByIdAndUpdate(
    req.query._id,
    { $set: req.body },
    { new: true },
    (err, data) => {
      console.log("API", req.query._id, req.body);
      if (err) {
        res.json({ success: false, message: "Gives error" });
      } else {
        res.json({ success: true, data: data });
      }
    }
  );
});

app.listen(port, function () {
  console.log("The server is now started at port" + port);
});
