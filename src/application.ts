import http from "node:http";
import { dispatch } from "./middleware/dispatcher.js";
import { findRoute } from "./router/matcher.js";
import type { Request, Response } from "./types/http.js";
import type { Middleware } from "./types/middleware.js";
import type { Handler, Route } from "./types/route.js";
export class Application {
  private server: http.Server;
  private middlewares: Middleware[] = [];
  private routes: Route[] = [];

  constructor() {
    this.server = http.createServer((req, res) => {
      dispatch(this.middlewares, req, res, () => {
        const result = findRoute(this.routes, req);
        if (result) {
          const request = req as Request;
          request.params = result.params;
          request.query = result.query;

          const response = res as Response;
          response.json = (data) => {
            response.writeHead(200, {
              "content-type": "application/json",
            });

            response.end(JSON.stringify(data));
          };
          response.redirect = (path) => {
            response.writeHead(302, { Location: path })
            res.end()
          };
          result.route.handler(request, response);
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
