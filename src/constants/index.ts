export interface IUser {
  name: string;
  email: string;
  password: string;
  city?: string;
  colony?: string;
  postOffice?: string;
  subDistrict?: string;
  number?: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  imgUrl?: string;
  role: "admin" | "reader" | "editor";
  authProvider?: string;
  isDeleted?: boolean;
  status?: "active" | "blocked";
}
