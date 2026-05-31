const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = JWT.verify( token, process.env.JWT_SECRET );
        // Attach user information to request
        req.user = decoded;

        next();

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
