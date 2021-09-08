import { LocalStorageService } from "./LocalStorageService";

describe("testing LocalStorageService", () => {
  test("it is a class implement StorageService", () => {
    expect(LocalStorageService).toBeInstanceOf(Function);
  });
});
