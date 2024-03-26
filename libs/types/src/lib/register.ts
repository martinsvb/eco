export enum RegistrationItems {
  email = 'email',
  name = 'name',
  password = 'password',
  passwordConfirmation = 'passwordConfirmation',
}

export interface RegistrationData {
  [RegistrationItems.email]: string;
  [RegistrationItems.name]?: string;
  [RegistrationItems.password]: string;
  [RegistrationItems.passwordConfirmation]: string;
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
