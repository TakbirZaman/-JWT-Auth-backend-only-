const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // 1. Extract the token from the cookies
    const token = req.cookies?.token;

    // 2. Reject if no token is found
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access. No token provided.' });
    }

    // 3. Verify the token
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access. Token is invalid or expired.' });
        }
        
        // 4. Attach decoded user data to the request object
        req.user = decoded;
        next(); 
    });
};

module.exports = { verifyToken };