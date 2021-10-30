# Missing log output issue

This repo has three express applications, each identical apart from the configuration passed into `pino()`.

## Requirements/expectations:

- Node 16x
- MongoDB 5.x running at localhost:27017

## Install

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

{"level":30,"time":1635619240867,"pid":78143,"hostname":"Seneca","msg":"App start"}
{"level":30,"time":1635619240873,"pid":78143,"hostname":"Seneca","msg":"API listening..."}
{"level":50,"time":1635619240934,"pid":78143,"hostname":"Seneca","err":{"type":"MongoServerError","message":"Authentication failed.","stack":"MongoServerError: Authentication failed.\n    at MessageStream.messageHandler (/Users/phil/dev/pino-problem/node_modules/mongodb/lib/cmap/connection.js:467:30)\n    at MessageStream.emit (node:events:390:28)\n    at processIncomingData (/Users/phil/dev/pino-problem/node_modules/mongodb/lib/cmap/message_stream.js:108:16)\n    at MessageStream._write (/Users/phil/dev/pino-problem/node_modules/mongodb/lib/cmap/message_stream.js:28:9)\n    at writeOrBuffer (node:internal/streams/writable:389:12)\n    at _write (node:internal/streams/writable:330:10)\n    at MessageStream.Writable.write (node:internal/streams/writable:334:10)\n    at Socket.ondata (node:internal/streams/readable:754:22)\n    at Socket.emit (node:events:390:28)\n    at addChunk (node:internal/streams/readable:315:12)","ok":0,"code":18,"codeName":"AuthenticationFailed"},"msg":"Authentication failed."}
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
$ npm run appWithPinoPretty

> pino-problem@1.0.0 appWithPinoPretty
> node appWithPinoPretty.js

[1635619248203] INFO: App start
```

## Pino configured with custom transport:

```js
const log = pino({
	transport: {
		target: "pino-pretty",
		options: { destination: 1, colorize: true, ignore: "pid,hostname" },
	},
});
```

Running `npm run appWithPinoCustom` results in even more missing logs:

```bash
$ npm run appWithPinoCustom

> pino-problem@1.0.0 appWithPinoCustom
> node appWithPinoCustom.js

```
