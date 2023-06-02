const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required user");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetails = await User.findOne({ email });
  if (userDetails) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(200).json({ _id: user._id, userName: user.userName, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({email});
  if(user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({
      user: {
        userName: user.userName,
        email: user.email,
        id: user.id
      }
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15mins"})
    res.status(200).json({accessToken});
   } else {
    res.status(401);
    throw new Error("Email or Password is incorrect")
   }
})

const currentUser = asyncHandler(async(req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser
};
