import type { IncomingMessage } from "node:http";
import type { Route } from "../types/route.js";
import type { Query } from "../types/http.js";

export const findRoute = (routes: Route[], req: IncomingMessage) => {
  for (const route of routes) {
    if (req.method !== route.method) {
      continue;
    }
    
    const url = new URL(req.url ?? "", `http://${req.headers.host}`)
    const query = Object.fromEntries(url.searchParams.entries());
    // for (const [key, value] of url.searchParams.entries()) {
    //   query[key] = value
    // }
  
    const routeSegments = route.path.split("/").filter(Boolean);
    const urlSegments = url.pathname.split("/").filter(Boolean);
   

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
      return {route, params, query};
    }
  }

  return undefined;
}; 