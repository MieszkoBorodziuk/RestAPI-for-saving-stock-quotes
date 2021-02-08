export type RepositoryMock<T> = {
    [P in keyof T]: jest.Mock<{}>;
  };

  export const repositoryMockFactory = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
    findOneOrFail: jest.fn(entity => entity),
    findOneBySymbol: jest.fn(entity => entity),
  }));

  