import type { IncomingMessage } from "node:http";

export type Query = Record<string, string | undefined>;
export type Params = Record<string, string | undefined>;
export type Request = IncomingMessage & {
  params: Params;
  query: Query;
};
