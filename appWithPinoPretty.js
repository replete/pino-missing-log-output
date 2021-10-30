const express = require("express");
const mongoose = require("mongoose");
const pino = require("pino");

const log = pino({
	transport: {
		target: "pino-pretty",
		options: { destination: 1, colorize: true, ignore: "pid,hostname" },
	},
});

const app = express();

log.info("App start");

app.listen(3000, async () => {
	log.info("API listening...");
	await connectDatabase();
});

async function connectDatabase() {
	try {
		// Trigger 'MongoServerError: Authentication failed' by supplying bad credentials
		await mongoose.connect(
			"mongodb://NON_EXISTANT_USER:NON_EXISTANT_PASS@localhost:27017/appdb"
		);
		log.info("Connected to Database...");
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
}
