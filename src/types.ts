export interface PhoneResponse {
  success: boolean;
  userId: string;
  msisdn: string;
  pin?: string;
}

export interface PinResponse {
  success: boolean;
  userId: string;
  productUrl: string;
}

export interface UserData {
  userId: string;
  msisdn: string;
  pin: string;
  productUrl: string;
}
