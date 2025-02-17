import express from 'express';
import { deleteUser, getAllUsers, getUserById, registerUser } from '../Controllers/UserController.js';

const routes = express.Router();

routes.post('/register', registerUser);
routes.get('/get_all_users', getAllUsers);
routes.get('/get_user_details/:id', getUserById);
routes.get('/delete_user/:id', deleteUser);

export default routes;