import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client Usecase unit test", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      document: "adfsdff",
      street: "street",
      number: "number",
      complement: "4322",
      city: "city",
      state: "state",
      zipCode: "zipCode"
    };

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.street).toEqual(input.street);
  });
});
