const bcrypt = require('bcryptjs');
const db = require("../models");
const User = db.user;
const Op = db.Op;
const {generateToken} = require("../utility/jwt");

  const handleGetAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['_tokens', 'password', 'confPassword'] } // Remove sensitive fields
      }); 
      return res.status(200).json({ code: 200, data: users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, message: "Internal server error" });
    }
  };

  const handleCreateUser = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    console.log(req.headers.origin, ' origin')
    if (!req.body) {
      return res.status(400).json({ code: 400, message: "Request body is required" });
    }
  
    try {
      const { password, confPassword } = req.body;
  
      if (password.toLowerCase() !== confPassword.toLowerCase()) {
        return res.status(400).json({ code: 400, message: "Password and Confirm password do not match" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const hashConfPassword = await bcrypt.hash(confPassword, 10);
      const profileImage = req.file?req.file.path:null;
      const user = await User.create({...req.body, password: hashPassword,confPassword:hashConfPassword,profileImage},{ transaction });
      await transaction.commit();

      const userData = user.toJSON();
      delete userData._tokens;
      delete userData.password;
      delete userData.confPassword;
      delete userData.roles;
  
      return res.status(200).json({ code: 200, message: "User created successfully", data: userData });
    } catch (error) {
      console.error("Error during user creation:", error);
      await transaction.rollback();
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({code: 400,message: `Unique constraint failed on field: ${error.errors[0].path}`});
      }else{
        return res.status(500).json({code: 500,message: "Internal server error",details: error.message,});
      }
    }
  };

  const handleUploadProfileImageById = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ code: 400, message: 'No file uploaded' });
      };
      const user = await User.findOne({
        where: {
          [Op.and]: [
            { id: req.params.id },
            { id: req.user.userId }
          ]
        }
      });
      if (!user) {
        return res.status(404).json({ code: 404, message: 'User not found' });
      };

      await User.update({ profileImage: req.file.path }, { where: { id:req.params.id } });
      const profileImage = `${process.env.DEV_BASE_URL}/${req.file.path}`;
  
      return res.status(200).json({ code: 200,message: 'Profile image updated successfully',data: { profileImage }});
    } catch (error) {
      console.error("Error during profile image update:", error);
      return res.status(500).json({ code: 500, message: "Internal Server Error", details: error.message });
    }
  };

  const handleGetUserById = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          [Op.and]: [
            { id: req.params.id },
            { id: req.user.userId }
          ]
        },
        attributes: { exclude: ['_tokens', 'password', 'confPassword'] } // Remove sensitive fields
      });
      console.log(user);
      
      if (user) {
        const profileImage = `${process.env.DEV_BASE_URL}/${user.profileImage}`;
        user.profileImage = profileImage;
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found or unauthorized" });
      }
    } catch (error) {
      console.error("Error during fetching user data:", error);
      return res.status(500).json({ code: 500, message: "Internal Server Error", details: error.message });
    }
  };

  const handleUpdateUserById = async (req, res) => {
    try {
      const [updated] = await User.update(req.body, {
        where: {
          [Op.and]: [
            { id: req.params.id },
            { id: req.user.userId }
          ]
        },
      });
      console.log(updated);
      
      if (!updated) {
        return res.status(404).json({ code: 404, message: 'User not found' });
      };
  
      return res.status(200).json({ code: 200, message: 'User updated successfully' });
    } catch (error) {
      console.error("Error during user update:", error);
      return res.status(500).json({ code: 500, message: "Internal Server Error", details: error.message });
    }
  };

  const handleDeleteUserById = async (req, res) => {
    try {
      const deleted = await User.destroy({
        where: {
          [Op.and]: [
            { id: req.params.id },
            { id: req.user.userId }
          ]
        },
      });
  
      if (!deleted) {
        return res.status(404).json({ code: 404, message: 'User not found' });
      }
  
      return res.status(200).json({ code: 200, message: 'User deleted successfully' });
    } catch (error) {
      console.error("Error during user deletion:", error);
      return res.status(500).json({ code: 500, message: "Internal Server Error", details: error.message });
    }
  };
  

  const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ code: 400, message: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ code: 400, message: 'Invalid email or password' });
      }
  
      // Generate token
      const token = generateToken(user);
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _token: token
      }
      const currentTokens = user._tokens || [];
      const updatedTokens = [...currentTokens, token];
      await User.update({ _tokens: updatedTokens },{ where: { email } });
      return res.status(200).json({ code: 200, message: "User Logged In", data: userData });
  
    } catch (error) {
      console.error("Error during login:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        const key = error.errors[0].path;
        const value = error.errors[0].value;
        return res.status(400).json({
          message: `Duplicate key error: ${key} with value "${value}" already exists.`,
          field: key,
          value: value
        });
      }else{
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
      }
  
    }
  };


module.exports = {handleGetAllUsers,handleCreateUser,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleUserLogin,handleUploadProfileImageById};