# Missing log output issue

This repo has three express applications, each identical apart from the configuration passed into `pino()`.

```js
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
```


### Requirements:

- Node 16x
- `npm install`

### Install

`npm install`

## Pino with default configuration:

```js
const log = pino();
```

Running `npm run appWithPino` results in expected behaviour.

```bash
$ npm run appWithPino

> pino-problem@1.0.0 appWithPino
> node appWithPino.js

{"level":30,"time":1635621351990,"pid":83045,"hostname":"Seneca","msg":"App start"}
{"level":30,"time":1635621351996,"pid":83045,"hostname":"Seneca","msg":"API listening..."}
{"level":50,"time":1635621351996,"pid":83045,"hostname":"Seneca","err":{"type":"Error","message":"some error","stack":"Error: some error\n    at connectDatabase (/Users/phil/dev/pino-problem/appWithPino.js:17:9)\n    at Server.<anonymous> (/Users/phil/dev/pino-problem/appWithPino.js:12:8)\n    at Object.onceWrapper (node:events:509:28)\n    at Server.emit (node:events:390:28)\n    at emitListeningNT (node:net:1368:10)\n    at processTicksAndRejections (node:internal/process/task_queues:82:21)"},"msg":"some error"}
```

## Pino configured with pretty-print:

```js
const log = pino({
	transport: {
		target: "pino-pretty",
		options: { destination: 1, colorize: true, ignore: "pid,hostname" },
	},
});
```

Running `npm run appWithPinoPretty` results in missing logs:

```bash
$ npm run appWithPinoCustom

> pino-problem@1.0.0 appWithPinoCustom
> node appWithPinoCustom.js
```

## Pino configured with custom transport:

```js
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
```

Running `npm run appWithPinoCustom` results in even more missing logs:

```bash
$ npm run appWithPinoCustom

> pino-problem@1.0.0 appWithPinoCustom
> node appWithPinoCustom.js

```
