import type { IncomingMessage, ServerResponse } from "node:http";

export type Query = Record<string, string | undefined>;
export type Params = Record<string, string | undefined>;
export type Request = IncomingMessage & {
  params: Params;
  query: Query;
};
export type Response = ServerResponse & {
  json(data: unknown): void;
  redirect(path: string): void;
};
