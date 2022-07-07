import { TUsers } from '../models/IUser';
import get from '../utils/get';

export default class UserService {
  public users: TUsers = [];

  public static async fetchUsers(endpoint: string) {
    return get(endpoint); // previous realization
  }

  static fetchMethodName = <T>( // pretty
    url: string
  ): Promise<T> | never => // returned type OR generic-promise, or NEVER.., NEVER is using in case of a function throws an error
    fetch(url).then(response => {
      // request data
      const { statusText: message, status: code } = response; // comfortable destructurization
      if (!response.ok) {
        // so the response isn't OK?
        throw new Error( // throw an ERROR!
          JSON.stringify({
            message,
            code,
          })
        );
      }

      return response.json() as Promise<T>; // return promise instead
    });
}
