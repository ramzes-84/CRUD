// import { ServerResponse } from "http";

export interface User extends UserData {
  id: string;
}
export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type ResponsePayLoad = CustomError | UserResponse;
export interface CustomError {
  error: string;
}
export interface UserResponse {
  data: User[] | User;
}
export enum Endpoints {
  users = "/api/users",
}
// export interface HandlersObj {
//   GET: (res: ServerResponse) => void;
//   PUT: () => void;
//   DELETE: () => void;
//   POST: () => void;
// }
