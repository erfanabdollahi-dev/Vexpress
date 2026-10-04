import type { Request, Response } from "./http.js";

export type Handler = (req: Request, res: Response) => void | Promise<void>;
export type Route = {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  handler: Handler;
};
