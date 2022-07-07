/**
 * @sessionStorageVSlocalStorage 1 vs 2
 * 1) using WHEN we need to save data WITHIN session
 * 2) using to save data PERMANENT, until user won't decide to REMOVE data by ITSELF
 * Cookie vs WebStorage
 * https://ru.hexlet.io/blog/posts/lokalnoe-hranilische-vs-sessionnoe-hranilische-vs-cookie
 */

/** Service class representing of a convenient way to use localStorage */
export default class LocalStorageService {
  /**
   * Get the value of localStorage item by key
   * @template Type generic type setting after parsing an existing value of LS value
   * @param key string
   * @returns {Type | null} The value representing a generic Type or null in case of value nonexistence
   */
  public static getItem = <Type>(key: string): Type | null => {
    const localStorageValue = localStorage.getItem(key) || '';

    return localStorageValue ? (JSON.parse(localStorageValue) as Type) : null;
  };

  /**
   * Set item to a localStorage
   * @template Type
   * @param key string
   * @param {Type} value generic type of a setting value
   * @returns void
   */
  public static setItem = <Type>(key: string, value: Type): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  /**
   * Returns count of localStorage recorded items
   */
  public static getLength = (): number => localStorage.length;

  /**
   * Remove item from localStorage by corresponding key. Do nothing, if an item doesn't exist
   * @param key string
   */
  public static removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  /**
   * Help you to read a key by index of an item of LS
   * @param index number of an item you want to read from LS
   * @returns {string | null} key or null
   */
  public static getKey = (index: number): string | null =>
    localStorage.key(index);

  /**
   * Clear localStorage
   */
  public static clear = (): void => {
    localStorage.clear();
  };
}

// simple usage

// DON'T DO THIS, you do not need to create an INSTANCE, because whole methods implementation contains ONLY static modifiers

const ls = new LocalStorageService();

// FOLLOW THIS INSTEAD

const obj =
  LocalStorageService.getItem<{ name: string; age: number }>('object');

// then perform any required operation with 'obj'

if (obj) {
  console.log(obj.age + 14);
}

LocalStorageService.setItem('key', { name: 'string', age: 'number' });
