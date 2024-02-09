import { UserData } from "../types";

export const checkUserData = (data: UserData) => {
  const username = data.username;
  const age = +data.age;
  const hobbies = data.hobbies;
  if (username && age && hobbies) {
    return true;
  }
  return false;
};
