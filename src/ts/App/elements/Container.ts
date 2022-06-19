import Element from '../abstract/Element';

export default class Container extends Element {
  // inherit from Element
  element: HTMLElement; // set a required prop!

  constructor(className: string, element: string) {
    // get some init parameters
    super(); // hey, its me! DONT FORGET ME NEVER!

    this.element = document.createElement(element); // create an element with BrowserAPI
    this.element.className = className; // set it className
  }
}
