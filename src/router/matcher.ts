import type { IncomingMessage } from "node:http";
import type { Route } from "../types/route.js";
import type { Request } from "../types/http.js";

export const findRoute = (routes: Route[], req: IncomingMessage) => {
  for (const route of routes) {
    if (req.method !== route.method) {
      continue;
    }

    const routeSegments = route.path.split("/").filter(Boolean);
    const urlSegments = req.url?.split("/").filter(Boolean);

    if (!urlSegments) {
      return undefined;
    }

    if (routeSegments.length !== urlSegments.length) {
      continue;
    }

    let matched = true;
    let params : Record<string, string | undefined> = {}
    for (const index in routeSegments) {
      const routeSegment = routeSegments[index];
      const urlSegment = urlSegments[index];

      if (routeSegment?.startsWith(":")) {
        const paramKey = routeSegment.slice(1)
        params[paramKey] = urlSegment
        continue;
      }

      if (routeSegment !== urlSegment) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return {route, params};
    }
  }

  return undefined;
}; 