import { IncomingMessage } from "http";
import { parse } from "url";
import { HttpMethod } from "../types";

export const parseUrl = (req: IncomingMessage) => {
  if (req.url && req.method) {
    const parsedUrl = parse(req.url, true);
    const query = parsedUrl.query;
    const path = parsedUrl.pathname ?? "";
    const method = req.method.toUpperCase() as HttpMethod;
    return { query, path, method };
  }
  return null;
};
