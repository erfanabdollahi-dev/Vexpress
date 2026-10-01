import type { ServerResponse } from "node:http";
import type { Request } from "./http.js";

export type Handler = (req: Request, res: ServerResponse) => void;
export type Route = {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  handler: Handler;
};
