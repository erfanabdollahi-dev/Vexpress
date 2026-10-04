import type { IncomingMessage, ServerResponse } from "node:http";
import type { ErrorMiddleware, Middleware } from "../types/middleware.js";

export function dispatch(
  middlewares: Middleware[],
  errorMiddlewares: ErrorMiddleware[],
  req: IncomingMessage,
  res: ServerResponse,
  onComplete: (handleError: (error: unknown) => void) => void,
  onError: (error: unknown) => void,
) {
  let errorIndex = 0;

  const handleError = (error: unknown) => {
    const middleware = errorMiddlewares[errorIndex];

    if (!middleware) {
      onError(error);
      return;
    }

    errorIndex++;

    try {
      const result = middleware(error, req, res, () => {
        handleError(error);
      });

      Promise.resolve(result).catch((error) => {
        handleError(error);
      });
    } catch (error) {
      handleError(error);
    }
  };

  let index = 0;

  const next = () => {
    if (index >= middlewares.length) {
      onComplete(handleError);
      return;
    }
    const middleware = middlewares[index];
    if (!middleware) return;
    index++;
    try {
      const result = middleware(req, res, next);
      Promise.resolve(result).catch((error) => {
        // handle error
        handleError(error);
      });
    } catch (error) {
      // handle error
      handleError(error);
    }
  };

  next();
}
