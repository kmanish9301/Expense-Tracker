import expressAsyncHandler from "express-async-handler";
import Expense from "../Models/ExpenseModel.js";
import UserExpenseMapping from "../Models/UserExpenseMappingModel.js";
import User from "../Models/UserModel.js";
import { createExpenseValidationSchema } from "../Utils/Validators.js";

// Create an expense and automatically assign it to a user
export const createExpense = expressAsyncHandler(async (req, res) => {
    const { expense_name, userId } = req.body;

    // Check if the user exists
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
        return res.status(404).json({ error: true, message: "User not found." });
    }

    const validateExpenseData = await createExpenseValidationSchema.validate(req.body, {
        abortEarly: false
    });

    // Check if the expense already exists
    const existingExpense = await Expense.findOne({ where: { expense_name } });
    if (existingExpense) {
        return res.status(400).json({ error: true, message: "Expense with this name already exists." });
    }

    // Create the expense
    const newExpense = await Expense.create({
        expense_name: validateExpenseData.expense_name,
        amount: validateExpenseData.amount,
        category: validateExpenseData.category,
        description: validateExpenseData.description
    });

    // Automatically create the mapping between user and expense
    await UserExpenseMapping.create({
        user_id: userId,
        expense_id: newExpense.id,
    });

    return res.status(201).json({
        message: "Expense created and assigned to user successfully.",
        data: newExpense,
    });
});

// Get all expenses for a user
export const getUserExpenses = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: true, message: "User not found." });
    }
    const userExpenses = await UserExpenseMapping.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Expense,
                required: true,
            },
        ],
    });
    if (!userExpenses.length) {
        return res.status(404).json({ error: true, message: "No expenses found for this user." });
    }
    const expenses = userExpenses.map((userExpense) => userExpense.Expense);

    return res.status(200).json({
        success: true,
        results: expenses,
    });
});
