const { calculateCo2Kg } = require("./co2");

describe("calculateCo2Kg", () => {
  test("calculates emissions for valid numbers", () => {
    expect(calculateCo2Kg(10, 0.21)).toBe(2.1);
  });

  test("returns 0 for invalid or negative inputs", () => {
    expect(calculateCo2Kg(-5, 0.21)).toBe(0);
  });
});
