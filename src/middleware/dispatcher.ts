import type { IncomingMessage, ServerResponse } from "node:http";
import type { Middleware } from "../types/middleware.js";

export function dispatch(
  middlewares: Middleware[],
  req: IncomingMessage,
  res: ServerResponse,
  onComplete: ()=>void,
) {
  let index = 0;

  const next = () => {
    if (index >= middlewares.length) {
      onComplete()
      return
    }
    const middleware = middlewares[index];
    if (!middleware) return;
    index++;
    middleware(req,res, next)
  };
  next()

}


