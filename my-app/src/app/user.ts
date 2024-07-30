// user.interface.ts
export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password?: string; // Optional because it won't be returned from the server on login
  }
  