import { createCookie } from "@remix-run/node";

export const visitedCount = createCookie("visited-count", { maxAge: 604_800 });
