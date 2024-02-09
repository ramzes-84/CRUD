import "dotenv/config";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import { parseUrl } from "../utils/urlParser";

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const rarsedDataFromUrl = parseUrl(req);
  if (!rarsedDataFromUrl) throw new Error("URL did not parsed");

  const { query, path, method } = rarsedDataFromUrl;
  const handler =
    endpoints[path as keyof typeof endpoints] &&
    endpoints[path as keyof typeof endpoints][method];

  handler(res);
});

server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`),
);
