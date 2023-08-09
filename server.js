import express from "express";
import cors from "cors";
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(express.json());

// db user: saif,
// password: CDwSgCQxvFspGuX8
// Replace the uri string with your connection string.

const uri =
	"mongodb+srv://saif:CDwSgCQxvFspGuX8@auracluster.civ2xld.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const option = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

async function run() {
	const client = new MongoClient(uri, option);
	try {
		await client.connect();
		console.log(
			"You successfully connected to MongoDB!"
		);
		return client.db("tour").collection("auraPlans");
		// const doc = [
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/data", async (req, res) => {
	try {
		const collection = await run();
		const cursor = collection.find({});
		const data = await cursor.toArray();
		console.log(data);
		res.send(data);
	} catch (err) {
		console.error("Error fetching data:", err);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
