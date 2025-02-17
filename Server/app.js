import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './src/Config/Database.js';
import UserRoutes from './src/Routes/UserRoutes.js';
import ExpenseRoutes from './src/Routes/ExpenseRoutes.js';
import { errorHandler, NotFoundError } from './src/Utils/ErrorHandleMiddleware.js';
import './src/Models/ModelAssociation.js'; // This must be imported because to load the association of models

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', UserRoutes);
app.use('/v1', ExpenseRoutes);

// Custom Error handlers
app.use(errorHandler);
app.use(NotFoundError);

// Connect to the database
connectDB(app);
