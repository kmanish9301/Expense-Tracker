export const NotFoundError = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
}

export const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            stack: err.stack
        }
    });
}