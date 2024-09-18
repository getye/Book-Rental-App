const express = require('express');
const UserController = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.post('/user/signup', UserController.signup);
userRouter.post('/user/login', UserController.login);
userRouter.get('/admin/owners', UserController.getAllOwners);
userRouter.get('/admin/users', UserController.getAllUsers);
userRouter.put('/admin/users/:userId/status', UserController.updateUserStatus);
 
module.exports = userRouter;
