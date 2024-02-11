import { UserData } from "../types";

export const isUserDataOnUpdate = (obj: object) => {
  if ("age" in obj) {
    if (typeof obj.age !== "number") return false;
  }
  if ("username" in obj) {
    if (typeof obj.username !== "string") return false;
  }
  if ("hobbies" in obj) {
    if (!(obj.hobbies instanceof Array)) {
      return false;
    }
  }
  return true;
};

export const isAUserData = (obj: object): obj is UserData => {
  if ("username" in obj && "hobbies" in obj && "age" in obj) {
    if (
      typeof obj.age === "number" &&
      typeof obj.username === "string" &&
      obj.hobbies instanceof Array &&
      obj.hobbies.every((hobby) => typeof hobby === "string")
    ) {
      return true;
    }
  }
  return false;
};
