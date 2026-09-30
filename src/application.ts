import http from "node:http";
import { dispatch } from "./middleware/dispatcher.js";
import type { Middleware } from './types/middleware.js';
export class Application {
  
  private server: http.Server; 
  private middlewares : Middleware[] = []
  

  constructor() {
    this.server = http.createServer((req, res) => {
      dispatch(this.middlewares, req, res)
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("hello, world!");
    });
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware)
  }

  listen(PORT: number) {
    this.server.listen(PORT, () => {
      console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
  }
}
