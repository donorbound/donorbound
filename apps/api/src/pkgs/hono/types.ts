import type { Context as GenericContext } from "hono";

import type { HonoContext } from "./context";

export type Context = GenericContext<HonoContext>;
