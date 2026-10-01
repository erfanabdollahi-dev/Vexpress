import http from "node:http";
import { dispatch } from "./middleware/dispatcher.js";
import { findRoute } from "./router/matcher.js";
import type { Middleware } from "./types/middleware.js";
import type { Handler, Route } from "./types/route.js";
export class Application {
  private server: http.Server;
  private middlewares: Middleware[] = [];
  private routes: Route[] = [];

  constructor() {
    this.server = http.createServer((req, res) => {
      dispatch(this.middlewares, req, res, () => {
        const route = findRoute(this.routes, req);
        if (route) {
          route.handler(req, res);
        } else {
          res.writeHead(404, { "content-type": "text/plain" });
          res.end("Not Found");
        }
      });
    });
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  get(path: string, handler: Handler) {
    this.routes.push({ method: "GET", path, handler });
  }
  post(path: string, handler: Handler) {
    this.routes.push({ method: "POST", path, handler });
  }
  put(path: string, handler: Handler) {
    this.routes.push({ method: "PUT", path, handler });
  }
  delete(path: string, handler: Handler) {
    this.routes.push({ method: "DELETE", path, handler });
  }

  listen(PORT: number) {
    this.server.listen(PORT, () => {
      console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
  }
}
