import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

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

export { signUp };
