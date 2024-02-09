import { ServerResponse, IncomingMessage } from "http";
import { ResponsePayLoad } from "../types";

export const sendResponse = (
  res: ServerResponse<IncomingMessage>,
  statusCode: number,
  contentType: { "Content-Type": string },
  data: ResponsePayLoad,
) => {
  res.writeHead(statusCode, contentType);
  res.end(JSON.stringify(data));
};
