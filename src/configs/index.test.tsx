import config from "./index";

describe("config object", () => {
  it("should have a BASE_URL property", () => {
    expect(config).toHaveProperty("BASE_URL");
  });

  it("should have a string value for BASE_URL property", () => {
    expect(typeof config.BASE_URL).toBe("string");
  });
});