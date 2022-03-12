const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc Register new user
// @route POST /api/v1/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // destructure body data
  const { name, email, password } = req.body;

  // validate the data
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // hash password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create the user 
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

  // res.json({ message: "Register User" });
});

// @desc Login new user
// @route POST /api/v1/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

// @desc  Get User Data
// @route GET /api/v1/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
