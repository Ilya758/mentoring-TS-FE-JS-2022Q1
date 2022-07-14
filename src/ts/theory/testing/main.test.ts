// Testing

/** We're speaking about types of tests. Here they are:
 * 1) unit
 * 2) integration
 * 3) e2e
 *
 * https://doka.guide/js/how-to-test-and-why/
 * Read please, all the related articles in this resource
 *
 * The classical scheme of unit tests
 * 1) arrange - prepare your entry testing data + expected result
 * 2) act - perform some operations to get an actual result
 * 3) assert - expected === actual result ???
 *
 */

const add = (x: number, y: number) => x + y;

describe('testing add function', () => {
  it('with x=1, y=2', () => {
    const expected = 3;
    const actual = add(1, 2);

    expect(expected).toEqual(actual);
  });
});

class DataService {
  static data: string[];

  public static addData = (dataToAdd: string): void => {
    DataService.data = [...DataService.data, dataToAdd];
  };

  public static removeData = (dataToRemove: string): void => {
    DataService.data = DataService.data.filter(data => data !== dataToRemove);
  };

  public static clearData = (): void => {
    DataService.data = [];
  };
}

beforeEach(() => {
  // a Jest API to perform any operation before starting EACH test
  DataService.clearData();
});

describe('test DataService class', () => {
  it('correctly create an instance', () => {
    expect(DataService.data).toHaveLength(0);
  });

  it('handle adding new data correctly', () => {
    const expectedData = 'some data';
    DataService.addData(expectedData);

    expect(DataService.data[0]).toEqual(expectedData);
  });

  it('handle removing useless data correctly', () => {
    const firstData = 'some data';
    const nextData = 'some data2';

    DataService.addData(firstData);
    DataService.addData(nextData);
    DataService.removeData(nextData);

    expect(DataService.data[0]).not.toEqual(nextData);
  });
});
