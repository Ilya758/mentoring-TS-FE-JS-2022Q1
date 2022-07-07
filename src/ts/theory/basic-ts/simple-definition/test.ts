/* eslint-disable indent */
import '@styles/style';

// Everyday types

/**
 * @EverydayTypes
 * This group is for the everyday using and includes:
 * - number
 * - string
 * - boolean
 * - undefined
 * - null
 * - etc
 */

/**
 * How the TypeScript understand, what type IS it we're using?
 * 1. Type inference - a built-in mechanism, that helps to define type by TS ITSELF
 * 2. Type annotation - the same mechanism, you're using like
 *
 * let number: number;
 *
 * 3. Type assignment - an ability to assign a type by user
 * const element = document.querySelector('.root') as HTMLDivElement;
 */

let number = 1; // so, the TS understand, what type is it, right? :), just hover a variable by mouse to be sure

// let str: string;

let vr; // variable initialization, so the type is an ANY, IMHO, it's a bug, let's consider, that it's a regular feature

vr = 1; // then we do a value assignment, try to hover a variable, y'll see, the type is ANY, so, unexpected behaviour, lmfao)))

let str = ''; // another example of a type inference, an expecting type is a STRING
let counter = 0; // the same, but === NUMBER

let ele = document.createElement('a'); // so, can we reply actions with BrowserAPI? YEAH! Try to hover to the 'el' variable === HTMLAnchorElement

// Object => Event => Node => Element => HTMLElement => ... // Be sure, the prototype chain is making it's own serious job with inheritance:)

let el = document.getElementById('.link'); // So, what'll be occur, in case of I really want to find an ELEMENT which type is link (<a href />) ?

// el.href = 'example.com'; // if an inferred type ISN'T a HTMLAnchorElement, TS assume, brah, you rly want to set a 'href' to the HTMLElement even if it doesn't have this prop? Well!

// let el = document.getElementById('.link') as HTMLAnchorElement // here is your cure, to ASSIGN a type of a variable

// el.href = 'example.com'; / -> no longer any misunderstandings!

console.log(el); // to see an element with markup-style
console.dir(el); // to see an object-oriented structure of a tag with list of an instance properties

type TUnionType = string | number | boolean | null; // Union type in case you want to create a type, that can have union (множественное/объединённое представление типа) type structure in different cases

type TAlias = string; // type alias is a way to declare a type, useful like
// type TUsers = IUser[] instead of common using in most of variables IUser[], tooo boring, right ? :)

let sentence: TUnionType; // so, I ASSUME, after initialization, the type of a variable will be that union type!

sentence = 'Lorem ipsum'; // it rly WORKS!

sentence = 1; // another bingo

sentence = {}; // hey, what're y doing maaan?

/**
 * @ConstraintTypes
 * The way you can NARROW your types with SPECIFIC values
 * Example: create an array, which will has ONLY numbers 1 2 3
 *
 * const mySpecificArray: (1 | 2 | 3)[] = [1, 2, 3, 4]; / -> so, the 4 is a REDUNDANT (лишнее)
 */

type TConstraintType = '1' | '2'; // very simple type

let costraintVar: TConstraintType = '1'; // ye, another procedure
costraintVar = '2'; // gotcha
costraintVar = 1; // good luck
costraintVar = false; // not this again!!

/**
 * @IntersectionType
 * I've forgotten to explain about THIS monster
 * An intersection is a way to CONCAT types, so your final type MUST have enumerated types
 * type TIntersectionTypeUser = { age: number } & { name: string };
 * const validUser: TIntersectionTypeUser = { age: 1, name: 'Ooo' };
 * const invalidUser: TIntersectionTypeUser = { age: 2 };
 *
 * DONT DO THIS
 * type TIntersectionTypeUser = { age: number } & number; // NEVER!
 * const wowMegaInvalidUser: TIntersectionTypeUser = { age: 15, 1: 1 }; / -> creepy idea and it doesn't work PROPERLY
 */

/**
 * @interface
 * A way to set types of an some object y've already received from API
 * @keyword interface
 * @name IInterfaceName
 */

interface IUser {
  id: string;
  name: string;
  age: number;
  hobbies: THobbies;
}

type THobbies = string[]; // or [string] or Array<string> / -> some ways to declare a more complicated type, it work properly/equally

// tuple (кортёж) - is an array of a SPECIFIC values, make sence in case of React useState/useReducer objects
// let tuple = [1, '2', false] / -> [number, string, boolean] WORK!
// let tuple: [number, string, boolean] = [1, '2', {}] / -> [number, string, ?] ERROR!

let user: IUser = {
  // use like common type annotation
  age: 25,
  name: '1',
  id: '15',
  hobbies: ['1', '2'],
};

// FUNCTIONS

/**
 * @function logger
 * @param x string
 * @param y number | string
 * @returns TReturnedFunctionType
 */

function logger(x: string, y: number | string): TReturnedFunctionType {
  console.log(x, y); // just log both of vars!

  if (typeof y === 'string') {
    //   const str = (y as string).toUpperCase(); // so, I assume y-arg is a STRING-type and want to do some STRING-operations :)
  }

  //   if (typeof y === 'number') { // in case of number
  //     return y;
  //   }

  //   return 0; / -> return as a regular number

  return () => 0; // huh, what a cringe )) see the TReturnedFunctionType
}

type TReturnedFunctionType = () => number; // returning type is a CALLBACK, that returns a number

logger('1', 2); // ok

logger('1', '2'); // too

logger('1', {}); // cringe

/**
 * type VS interface
 * types for function arguments, constraints/narrowing, aliases
 * interfaces for API responses
 */

/**
 * @generic
 * A way to use a polymorphism
 * @returns anything y WANT!
 */

const genericLogger = <Arg>(x: Arg): Arg => x; // get a number and returns a number
// function genericLogger<Arg>(x: Arg): Arg { // function declaration
//   return x;
// }

const numb = genericLogger<number>(1); // number!

// more complicated example
type TMapOperation = 'add' | 'removeLast';

const mapper = <CollectionType, IncomingArg = unknown>( // IncomingArg = unknown is a WAY to set a generic type by default
  collection: (CollectionType | IncomingArg)[],
  operation: TMapOperation,
  element?: IncomingArg
): ConcatArray<CollectionType | IncomingArg> =>
  operation === 'add'
    ? [...collection].concat(element as IncomingArg) // every operation performs with COPYING AND NOT MUTATING
    : [...collection].slice(0, -1); // so the rule is to KEEP your incoming vars in PURITY!

mapper<number, string>([1, 2, 3], 'add', '4'); // add an string-type element to the collection
mapper<number>([1, 2, 3], 'removeLast'); // remove last elem from the collection

interface IExtendedUser {
  name: string;
  age: number;
  hobbies?: string[]; // so type like this and y can do the prop as A NON-REQUIRED!
}

const extUser: IExtendedUser = {
  // hey! there's no any error, in case of hobbies?
  age: 25,
  name: 'Illia',
  // hobbies: ['dfdf', 'sdfd'],
};
let hobbies;
if (extUser.hobbies) {
  // so in case of you want to check an EXISTENCE
  hobbies = extUser.hobbies.map(hobby => hobby.toUpperCase());
}

// type TPickUser = Pick<IExtendedUser, 'name' | 'age'>; // Pick Omit Required Record Exclude Extract Readonly etc === UTILITY types for flexible type-creation mechanism!
