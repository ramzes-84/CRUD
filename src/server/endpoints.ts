import { IncomingMessage, ServerResponse } from "http";
import {
  sendResponse,
  userDeletedRes,
  userNotFoundRes,
  wrongMethodRes,
  wrongUserFieldsRes,
  wrongUuidRes,
} from "../utils/sendRes";
import { dataBase } from "../dataBase";
import { Endpoints, User } from "../types";
import { v4, validate } from "uuid";
import { checkUserData, isAUserData } from "../utils/userDataChecker";

export const CONTENT_JSON = { "Content-Type": "application/json" };

export const endpoints = {
  [Endpoints.user]: {
    GET(id: string, res: ServerResponse) {
      if (!validate(id)) {
        wrongUuidRes(res);
      } else {
        const user = dataBase.find((user) => user.id === id);
        if (user) {
          sendResponse(
            200,
            CONTENT_JSON,
            {
              data: user,
            },
            res,
          );
        } else userNotFoundRes(res);
      }
    },
    POST: (id: string, res: ServerResponse) => {
      wrongMethodRes(res);
    },
    PUT: (id: string, res: ServerResponse, req: IncomingMessage) => {
      if (!validate(id)) {
        wrongUuidRes(res);
      } else {
        const user = dataBase.find((user) => user.id === id);
        if (user) {
          let requestBody = "";
          req.on("data", (chunk) => {
            requestBody += chunk;
          });
          req.on("end", () => {
            const newUserData = JSON.parse(requestBody);
            if (checkUserData(newUserData)) {
              Object.assign(user, newUserData);
              sendResponse(
                201,
                CONTENT_JSON,
                {
                  data: user,
                },
                res,
              );
            } else wrongUserFieldsRes(res);
          });
        } else userNotFoundRes(res);
      }
    },
    DELETE: (id: string, res: ServerResponse) => {
      if (!validate(id)) {
        wrongUuidRes(res);
      } else {
        const user = dataBase.find((user) => user.id === id);
        if (user) {
          const recordIndex = dataBase.indexOf(user);
          dataBase.splice(recordIndex, 1);
          userDeletedRes(res);
        } else userNotFoundRes(res);
      }
    },
  },

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
        if (isAUserData(newUserData)) {
          dataBase.push({
            id: v4(),
            ...newUserData,
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
