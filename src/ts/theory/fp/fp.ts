// https://habr.com/ru/company/ruvds/blog/434112/
// https://frontend-stuff.com/blog/javascript-functional-programming/
// https://doka.guide/js/fp/

// FP basics

// pure functions
// Pure functions are those that CANNOT mutate passed arguments.
// Example: reducer in Redux, render-methods in React, a lot of built-in methods/js functions

const add = (x: number, y: number) => x + y;

const oneFunc = add(1, 2); // we've already known the "add" function logic => no problem

// unpure/side-effects

let object = { name: '1' }; // hey, here we have some global obj (referrence)

const addWithMutations = (x: number) => {
  // assume that functions do some operation with that object and changes the referrence
  object.name = '2'; // bad, we've mutated that global object; this work with primitives TOO, even TS cannot help you in most cases

  return Number(+object.name) + x;
};

addWithMutations(2);

// immutability

// Be sure you're always using spread/JSON/slice/etc to copy an object/collection to perform any required operation WITHOUT mutation

const filtratedArray = Array(10)
  .fill(null)
  .map((_, ndx) => ndx)
  .filter(item => item % 2);

const func = <T>(array: T[]) => {
  const copy = JSON.parse(JSON.stringify(array));

  const copy2 = [...array];

  const copy3 = array.slice(0);

  // your best solution somewhere here , maybe
};

func<number>(filtratedArray);

// first-class functions + high-ordered functions
// These are the functions (callbacks) we can pass to the another functions, then called them, use the result etc
type TFilterPredicate = (item: number) => boolean;
type TFiltrate = (filterPredicate: TFilterPredicate) => number[];

const wrapper = (filtrate: TFiltrate /** callback */) => {
  return filtrate(filterPredicate); // first-class
};

const filterPredicate = (item: number) => item < 4;

const filtrate = (filterPredicate: TFilterPredicate) => {
  return [1, 2, 3].filter(filterPredicate);
};

wrapper(filtrate);

const logger = (e: MouseEvent) => console.log(e.target);

document.addEventListener('click', logger);

// recursion
// To perform deep calculations effectively
// standart recursion HAS:
// 1) base predicate to EXIT from recursion (if don't, hehe will be trouble with full call stack => crash program)
// 2) body

const factorial = (num: number): number => {
  // base predicate
  if (num < 0) {
    return -1;
  }
  // aux predicate
  else if (num === 0) {
    return 1;
  }
  // body

  return num * factorial(num - 1);
};

factorial(5);

// composition
// High-ordered function, receive funcs as args, performs calculations, where the result of each function calling FLOWS to another function, the circle is ending, when there's no any function to call

const withOne = (x: number) => x + 1;
const withTwo = (y: number) => y + 2;

withOne(withTwo(3)); // easiest example

// with many functions with same type

const compose =
  <T>(...fns: ((arg: T[]) => T[])[]) =>
  (initArg: T[]) =>
    fns.reduce((acc, fn) => fn(acc), initArg);

interface ICollectionDto {
  id: string;
  isCreatedByUser: boolean;
  isDeleted: boolean;
  message: string;
}

type TCollectionDto = ICollectionDto[];

const collection: TCollectionDto = [
  {
    id: '1',
    isCreatedByUser: true,
    isDeleted: false,
    message: 'Text1',
  },
  {
    id: '2',
    isCreatedByUser: false,
    isDeleted: false,
    message: 'Text2',
  },
  {
    id: '3',
    isCreatedByUser: true,
    isDeleted: true,
    message: 'Text3',
  },
];

enum FilterTypesEnum {
  byUser = 'byUser',
  integrational = 'integrational',
  deleted = 'deleted',
}

type TCollectionType = 'byUser' | 'integrational' | 'deleted';

const filters = {
  byUser: false,
  integrational: false,
  deleted: false,
};

const filrateByType =
  (type: TCollectionType) => (passedCollection: TCollectionDto) => {
    let tempCollection: TCollectionDto = [];

    switch (type) {
      case FilterTypesEnum.byUser: {
        tempCollection = collection.filter(
          ({ isCreatedByUser }) => isCreatedByUser
        );
        break;
      }

      case FilterTypesEnum.deleted: {
        tempCollection = collection.filter(({ isDeleted }) => isDeleted);
        break;
      }

      case FilterTypesEnum.integrational: {
        tempCollection = collection.filter(
          ({ isCreatedByUser }) => !isCreatedByUser
        );
        break;
      }

      default:
        break;
    }

    return tempCollection;
  };

const filteredCollection = compose<ICollectionDto>(
  filrateByType(FilterTypesEnum.byUser),
  filrateByType(FilterTypesEnum.integrational),
  filrateByType(FilterTypesEnum.deleted)
)(collection); // hey, here is your collection!

// memoize
// Method to save big calculations without recalculation

const memoize = fn => {
  const cache = {};

  return result => {
    const key = typeof result === 'object' ? JSON.stringify(result) : result;

    return key in cache ? cache[key] : (cache[key] = fn(result));
  };
};

const add = (x: number) => x + 1;

const memoizedAdd = memoize(add);

memoizedAdd(1); // 2 calculated

memoizedAdd(1); // 2 from cache

// currying

// Can help your to create a closure with useful tricks/vars

// export const App = () => {
//   const handleClick = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
//     console.log(id);
//   };

//   return <>
//     <button onClick={handleClick(String(Math.random()))} />
//   </>
// }

// promises

const first = () => console.log('1');

const second = () => console.log('2');

const third = () => console.log('3');

first();

second();

third();

setTimeout(() => console.log('timeout'), 1000);

Promise.resolve(1).then(console.log);

// 1 2 3 1 timeout
