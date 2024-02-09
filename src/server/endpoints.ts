import { ServerResponse } from "http";
import { sendResponse } from "../utils/sendRes";

const CONTENT_JSON = { "Content-Type": "application/json" };

export const endpoints = {
  "/api/users": {
    GET(res: ServerResponse) {
      sendResponse(res, 404, CONTENT_JSON, {
        error: "Non-consuming method",
      });
    },
    POST: (res: ServerResponse) => {
      sendResponse(res, 404, CONTENT_JSON, {
        error: "Non-consuming method",
      });
    },
    PUT: (res: ServerResponse) => {
      sendResponse(res, 404, CONTENT_JSON, {
        error: "Non-consuming method",
      });
    },
    DELETE: (res: ServerResponse) => {
      sendResponse(res, 404, CONTENT_JSON, {
        error: "Non-consuming method",
      });
    },
  },
};
