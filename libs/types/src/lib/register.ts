import { CompanyItems } from "./company";
import { UserItems } from "./user";

export enum RegistrationItems {
  companyName = 'companyName',
}

export interface RegistrationData {
  [UserItems.Email]: string;
  [UserItems.Name]?: string;
  [UserItems.Password]: string;
  [UserItems.PasswordConfirmation]: string;
  [RegistrationItems.companyName]: string;
  [CompanyItems.Country]: string;
  [CompanyItems.Ico]?: string | null;
  [CompanyItems.Vat]?: string | null;
  [CompanyItems.Address]?: string | null;
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
