import Expense from "../ExpenseModel.js";
import UserExpenseMapping from "../UserExpenseMappingModel.js";

// Define Expense-User Mapping relation
Expense.hasMany(UserExpenseMapping, { foreignKey: "expense_id", onDelete: "CASCADE" });
UserExpenseMapping.belongsTo(Expense, { foreignKey: "expense_id" });

export default Expense;