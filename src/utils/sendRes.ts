import { ServerResponse, IncomingMessage } from "http";

export const sendResponse = (
  res: ServerResponse<IncomingMessage>,
  statusCode: number,
  contentType: { "Content-Type": string },
  data: { error: string },
) => {
  res.writeHead(statusCode, contentType);
  res.end(JSON.stringify(data));
};
