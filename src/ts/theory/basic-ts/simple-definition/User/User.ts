import { TUsers } from '../models/IUser';

export default class UserService {
  // Services - for the work with data, y can receive from the API endpoint
  users: TUsers; // import a required type
  // users: TUsers = []; // if THIS, y DON'T need to assign a value inside of a constructor

  constructor() {
    this.users = []; // set an INITIAL value in case of users-var above the constructor doesn't have an assigned value
  }
}
