const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
