import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  // hasing user password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    username,
    email,
    password: hashedPass,
  });

  try {
    //checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }

    await newUser.save();
    res.json({
      success: true,
      message: "SignUp Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errorHandler(200, "User not found!"));

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(200, "Password not matched!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
