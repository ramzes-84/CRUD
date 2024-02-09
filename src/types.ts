export interface User extends UserData {
  id: string;
}

export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}
