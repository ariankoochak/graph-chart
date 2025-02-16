class AppError extends Error {
    /**
     * @param {string} message - error message
     * @param {number} status - status code - like http request status code
     */
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "AppError";
    }
}

export default AppError;
