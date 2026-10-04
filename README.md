# vexpress

A lightweight HTTP framework built from scratch with **Node.js** and **TypeScript**, inspired by Express.

This is a learning project focused on understanding how HTTP frameworks work internally — middleware, routing, request/response handling, static files, and error propagation.

> **Note:** vexpress is a learning project and is not intended to be a production replacement for Express.

## Features

* Node.js `http` server
* TypeScript
* Middleware system
* Error middleware
* Routing

  * `GET`
  * `POST`
  * `PUT`
  * `DELETE`
* Route parameters
* Query parameters
* `res.json()`
* `res.redirect()`
* Static file serving
* Sync and async error handling
* ESM
* TypeScript declarations

## Quick Start

```bash
npm install vexpress
```

```ts
import vexpress from "vexpress";

const app = vexpress();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello from vexpress!",
  });
});

app.listen(3000);
```

Then visit:

```text
http://localhost:3000
```

## Routing

```ts
app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    query: req.query,
  });
});
```

A request such as:

```text
GET /users/42?active=true
```

provides:

```ts
req.params.id   // "42"
req.query.active // "true"
```

## Error Handling

Errors can be handled with `useError()`:

```ts
app.useError((error, req, res, next) => {
  console.error(error);

  res.writeHead(500, {
    "content-type": "application/json",
  });

  res.end(JSON.stringify({
    error: "Internal Server Error",
  }));
});
```

Both synchronous and asynchronous route errors are supported.

## Static Files

```ts
import { staticMiddleware } from "vexpress";

app.use(staticMiddleware("./public"));
```

## Architecture

```text
src/
├── index.ts
├── application.ts
├── middleware/
│   ├── dispatcher.ts
│   └── static.ts
├── router/
│   └── matcher.ts
└── types/
    ├── http.ts
    ├── middleware.ts
    └── route.ts
```

The main request flow is:

```text
HTTP Request
     ↓
Node HTTP Server
     ↓
Middleware Dispatcher
     ↓
Route Matcher
     ↓
Route Handler
     ↓
HTTP Response
```

Errors are forwarded through a separate error middleware pipeline.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the framework:

```bash
npm run build
```

Create a local npm package:

```bash
npm pack
```

## Why I Built This

I built vexpress to understand what happens underneath frameworks like Express instead of treating them as a black box.

The project helped me explore:

* Node's native HTTP server
* Middleware control flow
* Routing
* Request/response abstractions
* Async error propagation
* TypeScript API design
* ESM and package exports
* npm package publishing

## Status

**Functional learning project.**

The core framework is implemented and published as an npm package.

## License

MIT
