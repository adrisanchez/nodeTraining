const authMiddleware = require("../middleware/is-auth");

describe("Testing the authorization middleware", function () {
  let expect;

  before(async function () {
    const chai = await import("chai");
    expect = chai.expect;
  });

  it("Should throw and error if no auth header is present", function () {
    const req = {
      get: function(headerName) {
        return null;
      },
    };

    expect(authMiddleware.bind(req, {}, () => {})).to.throw("Not authenticated");
  });
});
