import express from 'express';
import { createExpense, deleteExpenses, getUserExpenses } from '../Controllers/ExpenseController.js';

const routes = express.Router();

routes.post('/create_expense', createExpense);
routes.get('/get_users_expenses/:id', getUserExpenses);
routes.get('/delete_expense/:id', deleteExpenses);

export default routes;