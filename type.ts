export type messageFields = "email" | "message" | "name" | "phone" | "subject";

export type signinFields = "email" | "password";
export type Role = "Admin" | "Staff" | "User";

export type Messages = {
  email: string;
  id: string;
  createdAt: Date;
  name: string;
  phone: string;
  subject: string;
  message: string;
  attendTo: boolean;
  updatedAt: Date;
}[];

export type Staff = {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updated: Date;
}[];

export type responseStatus = "success" | "danger" | "info";
