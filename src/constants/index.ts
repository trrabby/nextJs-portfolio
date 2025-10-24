export interface IUser {
  _id?: string;
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

export interface IBlog {
  _id?: string;
  title: string;
  category: string;
  author:
    | string
    | { name: string; email: string; imgUrl: string; role: string };
  tags: string[];
  content: string;
  coverImage: string;
  previousUploadedImg?: string[];
  thumbnails: string[];
  featured?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
}
