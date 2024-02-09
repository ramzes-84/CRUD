import { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "../utils/sendRes";
import { dataBase } from "../dataBase";
import { Endpoints, User } from "../types";
import { v4 } from "uuid";
import { checkUserData } from "../utils/userDataChecker";

export const CONTENT_JSON = { "Content-Type": "application/json" };

export const endpoints = {
  [Endpoints.users]: {
    GET(res: ServerResponse) {
      sendResponse(res, 200, CONTENT_JSON, {
        data: dataBase,
      });
    },
    POST: (res: ServerResponse, req: IncomingMessage) => {
      let requestBody = "";
      req.on("data", (chunk) => {
        requestBody += chunk;
      });
      req.on("end", () => {
        const newUserData = JSON.parse(requestBody);
        if (checkUserData(newUserData)) {
          dataBase.push({ id: v4(), ...newUserData });
          sendResponse(res, 201, CONTENT_JSON, {
            data: dataBase.at(-1) as User,
          });
        } else
          sendResponse(res, 400, CONTENT_JSON, {
            error:
              "Required fields was not provided or there are wrong data types",
          });
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
