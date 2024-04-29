import { UserItems } from "./user";

export enum RegistrationItems {
  companyName = 'companyName',
  country = 'country'
}

export interface RegistrationData {
  [UserItems.Email]: string;
  [UserItems.Name]?: string;
  [UserItems.Password]: string;
  [UserItems.PasswordConfirmation]: string;
  [RegistrationItems.companyName]: string;
  [RegistrationItems.country]: string;
}

export enum RegistrationState {
  none = 'none',
  registration = 'registration',
  verification = 'verification',
}

export enum VerificationItems {
  otp = 'otp',
}

export interface VerificationData {
  [VerificationItems.otp]: number;
}

export interface VerificationPayload extends VerificationData {
  [UserItems.Email]: string;
}
