export interface User extends UserData {
  id: string;
}
export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}
export enum AllowedMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export type ResponsePayLoad = CustomError | UserResponse;
export interface CustomError {
  error: string;
}
export interface UserResponse {
  data: User[] | User;
}
export enum Endpoints {
  users = "api/users",
  user = "api/users/",
}
