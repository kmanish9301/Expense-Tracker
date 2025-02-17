import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
    username: 'postgres',
    password: 'admin',
    database: 'expense-database',
    host: '127.0.0.1',
    dialect: 'postgres',
})

const PORT = process.env.PORT || 8000;

const connectDB = expressAsyncHandler(async (app) => {
    try {

        // Connect to the database
        await sequelize.authenticate();
        console.log('Connected to the database');

        // Sync the database models with the database
        // User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
        // User.sync({ force: true }) - This creates the table, dropping it first if it already existed
        // User.sync({ alter: true }) - This checks what is the current state of the table in the database(which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

        await sequelize.sync();
        // await sequelize.sync({ alter: true });

        console.log("Database synchronized");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error connecting or syncing the database:", error);
    }
})

export { connectDB, sequelize };
