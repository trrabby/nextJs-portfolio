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

// export interface IBlog {
//   _id?: string;
//   title: string;
//   category: string;
//   author:
//     | string
//     | { name: string; email: string; imgUrl: string; role: string };
//   tags: string[];
//   content: string;
//   coverImage: string;
//   previousUploadedImg?: string[];
//   thumbnails: string[];
//   featured?: boolean;
//   isPublished?: boolean;
//   isDeleted?: boolean;
//   createdAt?: Date;
// }

export interface IBlog {
  _id: string;
  title: string;
  category: string;
  author: Author;
  tags: string[];
  content: string;
  coverImage: string;
  thumbnails: string[];
  featured: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  feedbacks: Feedback[];
  totalLikes: number;
  totalDislikes: number;
  totalComments: number;
}

export interface Author {
  _id: string;
  name: string;
  email: string;
  imgUrl: string;
  role: string;
}

export interface Feedback {
  _id: string;
  feedback_by: FeedbackBy;
  feedback: Feedback2[];
  vote: string;
  createdAt: string;
}

export interface FeedbackBy {
  _id: string;
  name: string;
  email: string;
  imgUrl: string;
  role: string;
}

export interface Feedback2 {
  text: string;
  createdAt: string;
  _id: string;
  isDeleted: boolean;
  updatedAt?: string;
}

export interface IProject {
  _id?: string;
  projTitle: string;
  liveLInk: string;
  serverLink: string;
  clientLink: string;
  shortDescription: string;
  descriptionOfProject: string;
  stackUsed: string[];
  thumbnails: string[];
  specialRemarks?: string;
  featured?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
}
