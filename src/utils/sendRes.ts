import { ServerResponse, IncomingMessage } from "http";
import { ResponsePayLoad } from "../types";
import { CONTENT_JSON } from "../server/endpoints";

export const sendResponse = (
  statusCode: number,
  contentType: { "Content-Type": string },
  data: ResponsePayLoad,
  res: ServerResponse<IncomingMessage>,
) => {
  res.writeHead(statusCode, contentType);
  res.end(JSON.stringify(data));
};

export const wrongEndpointRes = sendResponse.bind(null, 404, CONTENT_JSON, {
  error: "Wrong endpoint.",
});

export const wrongMethodRes = sendResponse.bind(null, 404, CONTENT_JSON, {
  error: "The endpoint does not support this method.",
});

export const wrongUserFieldsRes = sendResponse.bind(null, 400, CONTENT_JSON, {
  error: "Required fields was not provided or there are wrong data types.",
});

export const wrongUuidRes = sendResponse.bind(null, 400, CONTENT_JSON, {
  error: "Provided identeficator is not a correct UUID.",
});

export const userNotFoundRes = sendResponse.bind(null, 404, CONTENT_JSON, {
  error: "User with provided UUID not found.",
});

export const userDeletedRes = sendResponse.bind(null, 204, CONTENT_JSON, {
  error: "User's record deleted successfully.",
});
