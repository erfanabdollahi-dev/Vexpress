import type { IncomingMessage, ServerResponse } from "node:http";
import type { Middleware } from "../types/middleware.js";

export function dispatch(
  middlewares: Middleware[],
  req: IncomingMessage,
  res: ServerResponse,
  onComplete: () => void,
  onError: (error: unknown) => void,
) {
  let index = 0;

  const next = () => {
    if (index >= middlewares.length) {
      onComplete();
      return;
    }
    const middleware = middlewares[index];
    if (!middleware) return;
    index++;
    try {
      const result = middleware(req, res, next);
      Promise.resolve(result).catch((error) => {
        // handle error
        onError(error);
      });
    } catch (error) {
      // handle error
      onError(error);
    }
  };
  next();
}
