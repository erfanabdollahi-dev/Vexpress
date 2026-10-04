import type { IncomingMessage, ServerResponse } from "http";

export type NextFunction = () => void;

export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void | Promise<void>

export type ErrorMiddleware = (
  error: unknown,
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => void | Promise<void>;