const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>
            res.status(err.statusCode || 500).json({
                statusCode: err.statusCode,
                data: null,
                message: err.message,
                success: false,
                errors: err,
            })
        );
    };
};

export { asyncHandler };
