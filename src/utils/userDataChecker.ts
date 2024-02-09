import { UserData } from "../types";

export const checkUserData = (data: UserData) => {
  const username = typeof data.username === "string";
  const age = typeof +data.age === "number";
  const hobbies = data.hobbies.every((hobby) => typeof hobby === "string");
  if (username && age && hobbies) {
    return true;
  }
  return false;
};
