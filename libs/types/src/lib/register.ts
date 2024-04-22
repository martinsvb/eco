export enum RegistrationItems {
  email = 'email',
  name = 'name',
  password = 'password',
  passwordConfirmation = 'passwordConfirmation',
  companyName = 'companyName',
  country = 'country'
}

export interface RegistrationData {
  [RegistrationItems.email]: string;
  [RegistrationItems.name]?: string;
  [RegistrationItems.password]: string;
  [RegistrationItems.passwordConfirmation]: string;
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
  [RegistrationItems.email]: string;
}
