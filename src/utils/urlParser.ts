import { IncomingMessage } from "http";
import { parse } from "url";
import { AllowedMethods } from "../types";

export const parseUrl = (req: IncomingMessage) => {
  if (req.url && req.method) {
    const method = req.method.toUpperCase() as AllowedMethods;
    let ID: string | undefined;
    const parsedUrl = parse(req.url, true);
    if (parsedUrl.pathname && parsedUrl.pathname.startsWith("/api/users")) {
      const segmentsArr = parsedUrl.pathname.split("/").slice(1);
      if (
        parsedUrl.pathname === "/api/users" ||
        parsedUrl.pathname === "/api/users/"
      ) {
        const path = segmentsArr.join("/");
        return { path, method, ID };
      } else if (segmentsArr.length === 3) {
        const path = segmentsArr.slice(0, 2).join("/");
        ID = segmentsArr.at(-1);
        return { path, method, ID };
      }
    }
  }
  return null;
};

export const methodChecker = (req: IncomingMessage) => {
  if (req.method) {
    return Object.keys(AllowedMethods).includes(req.method);
  }
};
