const express = require("express");
const { MongoClient } = require("mongodb").MongoClient;
const cors = require("cors");

const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server Running");
});

app.listen(port, () => {
	console.log("Server Port", port);
});
