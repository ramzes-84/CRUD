import { IncomingMessage, ServerResponse } from "http";
import {
  sendResponse,
  wrongMethodRes,
  wrongUserFieldsRes,
} from "../utils/sendRes";
import { dataBase } from "../dataBase";
import { Endpoints, User } from "../types";
import { v4 } from "uuid";
import { checkUserData } from "../utils/userDataChecker";

export const CONTENT_JSON = { "Content-Type": "application/json" };

export const endpoints = {
  [Endpoints.users]: {
    GET(res: ServerResponse) {
      sendResponse(
        200,
        CONTENT_JSON,
        {
          data: dataBase,
        },
        res,
      );
    },
    POST: (res: ServerResponse, req: IncomingMessage) => {
      let requestBody = "";
      req.on("data", (chunk) => {
        requestBody += chunk;
      });
      req.on("end", () => {
        const newUserData = JSON.parse(requestBody);
        if (checkUserData(newUserData)) {
          dataBase.push({
            id: v4(),
            ...newUserData,
            age: +(newUserData as User).age,
          });
          sendResponse(
            201,
            CONTENT_JSON,
            {
              data: dataBase.at(-1) as User,
            },
            res,
          );
        } else wrongUserFieldsRes(res);
      });
    },
    PUT: (res: ServerResponse) => {
      wrongMethodRes(res);
    },
    DELETE: (res: ServerResponse) => {
      wrongMethodRes(res);
    },
  },
};
