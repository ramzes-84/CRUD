import "dotenv/config";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import { parseUrl } from "../utils/urlParser";
import { wrongEndpointRes } from "../utils/sendRes";
import { Endpoints } from "../types";

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const parsedDataFromUrl = parseUrl(req);
  if (!parsedDataFromUrl) wrongEndpointRes(res);
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
});

server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`),
);
