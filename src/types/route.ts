import type { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;
export type Route = {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  handler: Handler;
};
