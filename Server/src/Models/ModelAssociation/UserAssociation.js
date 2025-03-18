import UserExpenseMapping from "../UserExpenseMappingModel.js";
import User from "../UserModel.js";

// Define associations here
User.hasMany(UserExpenseMapping, { foreignKey: "user_id", onDelete: "CASCADE" });
UserExpenseMapping.belongsTo(User, { foreignKey: "user_id" });

export default User;
