import http from "node:http";

export class Application {
  private server: http.Server;

  constructor() {
    this.server = http.createServer((req, res) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("hello, world!");
    });
  }

  listen(PORT: number) {
    this.server.listen(PORT, () => {
      console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
  }
}
