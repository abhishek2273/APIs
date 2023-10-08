class newError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode;
    }
}

export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    if (err.code == 11000) {
        const message = (`This ${Object.keys(err.keyValue)} is already exists!`);
        err = new newError(message, 400)
    }

    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
        // error: err.stack
    })
}

export default newError;