class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || "Internal server error",
    err.statusCode = err.statusCode || 500;

    if (err.name === "CasteError"){
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);

    }
    if (err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyvalue)} Entered`;
        err = new ErrorHandler(message, 400);

    }
    if (err.name === "CJsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try Again`;
        err = new ErrorHandler(message, 400);

    }
    if (err.name === "TokenExpiredError"){
        const message = `Json web token is Expired. Try Again.`;
        err = new ErrorHandler(message, 400);

    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;