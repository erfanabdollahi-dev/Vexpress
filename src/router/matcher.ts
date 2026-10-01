import type { IncomingMessage } from "node:http";
import type { Route } from "../types/route.js";

export const findRoute = (routes: Route[], req: IncomingMessage) => {
  for (const route of routes) {
    if (req.url === route.path && req.method === route.method) {
      return route;
    }
  }
  return undefined
}