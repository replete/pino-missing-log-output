const express = require("express");
const mongoose = require("mongoose");
const pino = require("pino");

const log = pino({
	transport: {
		pipeline: [
			{
				// logger output for terminal, colorised by level for easy reading
				target: "./pinocustom.mjs",
				options: {
					destination: 1,
				},
			},
		],
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
			"mongodb://NON_EXISTENT_USER:NON_EXISTENT_PASS@localhost:27017/appdb"
		);
		log.info("Connected to Database...");
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
}
