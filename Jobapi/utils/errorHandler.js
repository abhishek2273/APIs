class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export const customError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Intrenal Server Error";

    if (err.code == 11000) {
        const message = `This ${Object.keys(err.keyValue)} is already exist`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
    })
}

export default ErrorHandler