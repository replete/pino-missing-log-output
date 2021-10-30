import { Writable } from "stream";

export default (options) => {
	const levels = {
		// https://github.com/pinojs/pino/blob/master/docs/api.md#logger-level
		10: ` \x1b[2m[>]\x1b[0m`, //trace
		20: ` \x1b[35m[DEBUG]\x1b[0m`, //debug
		30: `\x1b[36m`, //info
		40: ` \x1b[33m[?]`, //warn
		50: ` \x1b[31m[!]`, //error
		60: ` \x1b[41m[!!!]`, //fatal
		Infinity: ``,
	};

	const colorizedLoggerTransportStream = new Writable({
		write(chunk, enc, cb) {
			const logEvents = chunk.toString().match(/[^\r\n]+/g); // split into lines
			logEvents.forEach((logEvent) => {
				const { level, time, msg, err } = JSON.parse(logEvent);
				const timestamp = new Date(time)
					.toISOString()
					.slice(11)
					.substring(8, 0);
				console.log(
					`\x1b[2m${timestamp}\x1b[0m${levels[level] || ""} ${msg}\x1b[0m`
				);
				if (err) console.log("\x1b[31m", err);
			});
			cb();
		},
	});
	return colorizedLoggerTransportStream;
};
