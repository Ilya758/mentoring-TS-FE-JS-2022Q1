/**
 * @enum Enum
 * The way to enumerate some vars like string number
 */

enum Constants {
  endpoint = 'https://jsonplaceholder.typicode.com/todos?_limit=10',
  // endpoint = 'https://jsonplaceholder.typicode.com/dos?_limit=10', // with errors

  oneVar = undefined, // -> ERROR :)
  // secondVar = false / -> ERROR! ONLY STRING | NUMBER
}

export default Constants;
