const bcrypt = require("bcryptjs");
const validator = require("validator");

const User = require("../models/user");

module.exports = {
  createUser: async function ({ userInput }, req) {
    // createUser(args, req) {
    // const email = args.userInput.email;
    const errors = [];
    const email = userInput.email;
    const name = userInput.name;
    const password = userInput.password;

    if (!validator.isEmail(email)) {
      console.log("Email is invalid. " + email);
      errors.push({ message: "Email is invalid." });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    ) {
      console.log("password is invalid. " + password);
      errors.push({ message: "Password too short!" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      error.code = 422;
      throw error;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
      });
      const createdUser = await user.save();
      return { ...createdUser._doc, _id: createdUser._id.toString() };
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  },
};
