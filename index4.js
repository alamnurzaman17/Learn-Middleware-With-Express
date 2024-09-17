import express from "express";
// import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let bandName = "";
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan("tiny"));

function bandGeneratorName(req, res, next) {
  console.log(req.body);
  // bandName = `${req.body["street"]}${req.body["pet"]}`;
  bandName = req.body["street"] + req.body["pet"];
  next();
}
app.use(bandGeneratorName);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
  // res.send(`<h1>Your band name is:</h1><h2>${req.body["street"]}${req.body["pet"]}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
