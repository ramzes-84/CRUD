import "dotenv/config";
import { createServer } from "http";
import { CONTENT_JSON, endpoints } from "./endpoints";
import { parseUrl } from "../utils/urlParser";
import { sendResponse } from "../utils/sendRes";
import { Endpoints } from "../types";

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const rarsedDataFromUrl = parseUrl(req);
  if (!rarsedDataFromUrl) throw new Error("URL did not parsed");

  const { query, path, method } = rarsedDataFromUrl;

  if (Object.values(Endpoints).includes(path as Endpoints)) {
    const endpointHandlersObj = endpoints[path as keyof typeof endpoints];
    if (Object.hasOwn(endpointHandlersObj, method)) {
      const handler = endpointHandlersObj[method];
      handler(res);
    } else
      sendResponse(res, 404, CONTENT_JSON, {
        error: "Non-consuming method",
      });
  } else
    sendResponse(res, 404, CONTENT_JSON, {
      error: "Wrong endpoint",
    });
});

server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`),
);
