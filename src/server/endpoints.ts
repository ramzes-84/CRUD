import { ServerResponse } from "http";
import { sendResponse } from "../utils/sendRes";
import { dataBase } from "../dataBase";
import { Endpoints } from "../types";

export const CONTENT_JSON = { "Content-Type": "application/json" };

export const endpoints = {
  [Endpoints.users]: {
    GET(res: ServerResponse) {
      sendResponse(res, 200, CONTENT_JSON, {
        data: dataBase,
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
