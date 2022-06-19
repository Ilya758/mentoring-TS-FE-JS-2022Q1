import Container from './elements/Container';
import Constants from './enums/constants';
import ErrorCode from './enums/ErrorCode';
import { TUsers } from './models/IUser';
import UserService from './services/UserService';

export default class App {
  private root = document.getElementById('root'); // get a root container of an app

  constructor() {
    this.insert(); // so the method is running when a new instance of an App will be generated during new App() => creating this-context => assign init values of a constructor args to its own properties => return this
  }

  private insert() {
    const container = new Container('container', 'div').element; // we've already arranged to use BEM-approach => .block>.container>.content>...

    const content = new Container('content', 'div').element;

    const list = new Container('list', 'ul').element;

    let errorInterface = new Container('error', 'div').element; // reserve interface in case of errors

    UserService.fetchUsers(Constants.endpoint) // the previous implementation, so, knock-knock to the API
      .then(async response => response.json()) // than it returns Response, and parse its body
      .then((users: TUsers) => {
        // here is our users, as I mentioned early, use type annotation to set a response.json() returning type OR
        /**
         *  .then(async (response): Promise<TUsers> => response.json()) // than it returns Response, and parse its body
         *  .then(users => { ...
         */
        users.forEach(({ id, title, userId, completed }) => {
          // common operation by extracting values from an collection of users
          const li = new Container('item', 'li').element;

          li.textContent = `id: ${id}, title: ${title}, userId: ${userId}, completed: ${
            completed ? 'Resolve' : 'Reject'
          }`; // an arrangement is NOT to use the innerHTML prop! use textContent INSTEAD => safety + escaping (экранирование содержимого)

          list.append(li);
        });
      })
      .catch(() => {
        // so you get an error
        errorInterface.textContent = `Some error ${ErrorCode.notFound} `; // fill our reserve interface with content
      });

    // UserService.fetchMethodName<TUsers>(Constants.endpoint)// final using
    //   .then(users => /** do your stuff */)
    //   .catch((err: Error) => console.log(JSON.parse(err.message))); // in case of an error It's not a BEST way to log after JSON parsing, interceptor - is THE BEST way for that purposes;

    content.append(list);
    container.append(errorInterface);
    container.append(content);
    this.root?.append(container); // finally give yrself the answer, why did I left a root as a HTMLElement and NOT a HTMLDivElement? :) imho, to avoid using ?, remember to assign a type of a root (as HTMLDivElement)
  }
}

// big thx for the watching! ))))
