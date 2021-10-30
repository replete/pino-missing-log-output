const express = require("express");
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
		// Imagine this is mongoose.connect(), and its thrown a Authentication Failed error, and no errror is logged. 
		throw Error('some error')
		log.info("Connected to Database...");
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
}
