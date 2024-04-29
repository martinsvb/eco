import { UserItems } from "./user";

export interface LoginData {
  [UserItems.Email]: string;
  [UserItems.Password]: string;
}
