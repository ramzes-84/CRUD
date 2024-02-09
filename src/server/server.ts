import "dotenv/config";
import { createServer } from "http";
import {} from "url";

const PORT = process.env.PORT || "3000";

const server = createServer(() => {});

server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`),
);
