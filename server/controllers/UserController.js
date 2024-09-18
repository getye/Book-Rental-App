const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const UserModel = require('../models/UserModel');
const { generateTokens } = require('../utils/jwt.helper'); 

const signup = async (req, res) => {
  const id = uuidv4();
  const { email, name, password, location, user_type } = req.body;
  const hashedpass = await bcrypt.hash(password, 10);
  const user_status = "Active"
  
  try {
    await UserModel.createUser(id, email, name, hashedpass, location, user_type, user_status);
    res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error, not registered" });
  }
}; 

const login = async (req, res) => {

  try {
    const { user_email, password } = req.body;
    const userResult = await UserModel.findUserByEmail(user_email);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];
    const validPass = await bcrypt.compare(password, user.user_password);

    if (!validPass) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate tokens using the correct function
    const tokens = generateTokens({
      user_id: user.user_id,
      user_name: user.user_name,
      user_email: user.user_email,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: false, // Use true in production
    });

    res.json({
      message: "User logged in",
      token: tokens.accessToken, // Use the access token generated by generateTokens
      username: user.user_name,
      user_type: user.user_type,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({ message: "Error logging in" });
  }
};

const getAllOwners = async (req, res) => {
  try {
    const owners = await UserModel.findAll();
    res.json(owners.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  const { userId } = req.params; // Get user ID from the request parameters
  const { status } = req.body; // Get the new status from the request body

  try {  
    // Call the model function to update the user status
    const updatedUser = await UserModel.updateUserStatus(userId, status);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User status updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating user status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {
  signup,
  login,
  getAllOwners,
  getAllUsers,
  updateUserStatus,
};