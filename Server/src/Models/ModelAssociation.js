import Expense from "./ExpenseModel.js";
import UserExpenseMapping from "./UserExpenseMappingModel.js";
import User from "./UserModel.js";

// Define associations here
User.hasMany(UserExpenseMapping, { foreignKey: "user_id", onDelete: "CASCADE" });
Expense.hasMany(UserExpenseMapping, { foreignKey: "expense_id", onDelete: "CASCADE" });

UserExpenseMapping.belongsTo(User, { foreignKey: "user_id" });
UserExpenseMapping.belongsTo(Expense, { foreignKey: "expense_id" });

export { Expense, User, UserExpenseMapping };
