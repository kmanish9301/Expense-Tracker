import express from 'express';
import { createExpense, getUserExpenses } from '../Controllers/ExpenseController.js';

const routes = express.Router();

routes.post('/create_expense', createExpense);
routes.get('/get_users_expenses/:id', getUserExpenses);

export default routes;