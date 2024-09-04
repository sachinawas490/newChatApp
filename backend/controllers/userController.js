import { users } from '../model/user.js';
import bcryptjs from "bcryptjs";
import jwtgenerate from '../config/jwtgeneration.js'
// Register User
export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    console.log(req.body);
    // Check if all fields are provided
    if (!fullname || !username || !password  || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }

    // Check if username already exists
    const finduser = await users.findOne({ username });
    if (finduser) {
      return res.status(400).json({ message: "Username is already used." });
    } else {
      // Create a new user
      const generatenumber = Math.ceil(Math.random() * 50);
      if (gender === 'female') {
        generatenumber += 50;
       }
      const profile = `https://avatar.iran.liara.run/public/${generatenumber}`;
      const newuser = await users.create({
        fullname,
        username,
        password: await bcryptjs.hash(password, 10),
        profilePhoto: profile,
        gender
      });

      // Return success response
      return res.status(201).json({ message: "User registered successfully", user: newuser });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred during registration" });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if all fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Fill all the data" });
    }

    // Find user by username
    const finduser = await users.findOne({ username });
    if (!finduser) {
      return res.status(400).json({ message: "Username not found" });
    } else {
      // Compare password
      const pass = await bcryptjs.compare(password, finduser.password);
      console.log(pass);
      if (pass) {
        const token = await jwtgenerate({ id:finduser._id });
        console.log("token - ", token);
        return res.status(200).json({user: finduser,token})
      } else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred during login. Please try again." });
  }
};
//sign Out
export const logout = (req, res) => {
  try {
    const token = res.cookie.token;
    console.log("token cokkie ", token);
    return res.status(200).json({ "message": "logout successfully done" });
  } catch (error) {
    res.status(401).json({ "message": "error occcurs during logout" });
  }
}
// other User
export const otherUser = async (req, res) => {
  try {
    console.log(">>   ", req.userid);
    const userid = req.userid;
    const findUsers = await users.find({ _id: { $ne: userid } });
    console.log(findUsers.length, "   >");
    if (findUsers.length === 0) {
      return res.status(400).json({ "message":"user's not found"})
    } else {
   
      return res.status(200).json({ users: findUsers });
    }
  
  } catch (error) {
    // Error handling: this block will only execute if an error is thrown in the try block
    console.error("Error occurred:", error);  // Log the error for debugging
    return res.status(401).json({ "message": "error occurs during getting other users" });
  }
};

export const userInfo = async (req, res) => {
  try {
    const userId = req.userid;
    const finduser = await users.findOne({ _id: userId });
    console.log(finduser, "valenkkj");
  
    if (finduser) {
      return res.status(200).json({ user: finduser });
    }
    console.log("finduser ", finduser);
  } catch (error) {
    res.status(401).json({ "message": "error occur during acquring userinfo" });
  }
}
