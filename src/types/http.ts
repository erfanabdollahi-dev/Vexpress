import type { IncomingMessage } from "node:http";

export type Request = IncomingMessage & {
  params: Record<string, string | undefined>;
};
