import "dotenv/config";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import { methodChecker, parseUrl } from "../utils/urlParser";
import {
  serverErrorRes,
  wrongEndpointRes,
  wrongMethodRes,
} from "../utils/sendRes";
import { Endpoints } from "../types";

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const parsedDataFromUrl = parseUrl(req);
  try {
    if (!parsedDataFromUrl) wrongEndpointRes(res);
    else if (!methodChecker(req)) wrongMethodRes(res);
    else {
      const { method, ID } = parsedDataFromUrl;
      if (!ID) {
        const handler = endpoints[Endpoints.users][method];
        handler(res, req);
      } else {
        const handler = endpoints[Endpoints.user][method];
        handler(ID, res, req);
      }
    }
  } catch {
    serverErrorRes(res);
  }
});

server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`),
);
