export interface Userdata {}
export interface UserdataResponse {
  message: string;
  user: Userdata;
  token: string;
}

export interface Userdata {
  name: string;
  email: string;
  role: string;
}
