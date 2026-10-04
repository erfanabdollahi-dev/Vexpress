import { Application } from "./application.js";
import { staticMiddleware } from "./middleware/static.js";
import type { Middleware } from "./types/middleware.js";

type Vexpress = {
  (): Application;
  static: (root: string) => Middleware;
};
const vexpress: Vexpress = () => {
  return new Application();
};

vexpress.static = staticMiddleware;

export default vexpress;
