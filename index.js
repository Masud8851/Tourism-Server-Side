const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ed7sj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		const assignmentDB = client.db("assignmentDB");
		const packageCollection = assignmentDB.collection("packages");
		const OrderCollection = assignmentDB.collection("orders");

		// Add Packeges
		app.post("/packages", async (req, res) => {
			const result = await packageCollection.insertOne(req.body);
			res.send(result);
			console.log(result);
		});

		// Get All Packeges
		app.get("/allpakages", async (req, res) => {
			const result = await packageCollection.find({}).toArray();
			res.send(result);
			console.log("result");
		});
	} finally {
		// await client.close()
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
