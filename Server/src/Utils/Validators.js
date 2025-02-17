import * as yup from 'yup';

export const createUserValidationSchema = yup.object().shape({
    user_name: yup.string().required('Username is required.'),
    email: yup.string().email('Invalid email.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
    role: yup.string().oneOf(['admin', 'user'], 'Invalid role.').default('user'),
});


export const createExpenseValidationSchema = yup.object().shape({
    expense_name: yup.string().required('Expense name is required.'),
    category: yup.string().required('Category is required.'),
    description: yup.string().required('Description is required.'),
    amount: yup
        .number()
        .typeError('Amount must be a number')
        .required('Amount is required.')
        .min(0, 'Amount must be at least 0'),
});