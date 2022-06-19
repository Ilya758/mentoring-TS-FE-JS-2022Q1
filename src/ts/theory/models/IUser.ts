export interface IUser {
  // the example of the User interface
  name: string;
  id: string;
}

export type TUsers = IUser[]; // just a collection of users
