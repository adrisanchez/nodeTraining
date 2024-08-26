describe("Basic Math Operations", function () {
  let expect;

  before(async function () {
    const chai = await import("chai");
    expect = chai.expect;
  });

  it("Should add numbers correctly", function () {
    const num1 = 2;
    const num2 = 4;

    expect(num1 + num2).to.equal(6);
  });

  it("Should not give a result of 5", function () {
    const num1 = 1;
    const num2 = 4;

    expect(num1 + num2).not.to.equal(5);
  });
});
