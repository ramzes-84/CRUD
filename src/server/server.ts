import "dotenv/config";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import { parseUrl } from "../utils/urlParser";
import { wrongEndpointRes, wrongMethodRes } from "../utils/sendRes";
import { Endpoints } from "../types";

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const parsedDataFromUrl = parseUrl(req);
  if (!parsedDataFromUrl) throw new Error("URL did not parsed");

  const { path, method } = parsedDataFromUrl;

  if (Object.values(Endpoints).includes(path as Endpoints)) {
    const endpointHandlersObj = endpoints[path as keyof typeof endpoints];
    if (Object.hasOwn(endpointHandlersObj, method)) {
      const handler = endpointHandlersObj[method];
      handler(res, req);
    } else wrongMethodRes(res);
  } else wrongEndpointRes(res);
});

server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`),
);
