const jwt = require('jsonwebtoken');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");
const cookieParser = require('cookie-parser');
const saltRounds = 10;

// Middleware for restricted routes
 require('dotenv').config();



// module.exports = {
//     restrictToLoggedinUserOnly
// };


// Signup Handler
async function handleUserSignup(req, res) {
  try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();

      console.log(process.env.JWT_SECRET);

      
      const token = jwt.sign(
          { id: newUser._id, email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
      );

      console.log("The token after signup is: ",token);
      res.status(201).json({
          success: true,
          message: "User created successfully",
          token,
          user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email
          }
      });
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Failed to create user' });
  }
}

// Login Handler
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        };

        console.log("token:", token);
        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    // restrictToLoggedinUserOnly,
    handleUserSignup,
    handleUserLogin,
};
