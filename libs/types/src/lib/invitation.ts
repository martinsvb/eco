import { UserItems } from "./user";

export interface InvitationData {
  [UserItems.Email]: string;
  [UserItems.Name]: string;
  [UserItems.Password]: string;
  [UserItems.PasswordConfirmation]: string;
}
