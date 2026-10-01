import type { IncomingMessage, ServerResponse } from "http";

export type NextFunction = () => void;
export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void


