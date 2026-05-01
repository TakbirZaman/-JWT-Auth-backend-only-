const jwt = require('jsonwebtoken');
require('dotenv').config();

// Logic for generating the token and setting the cookie
const generateToken = async (req, res) => {
    try {
        const userData = req.body; 
        
        const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1h' 
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        res.send({ success: true, message: "Token generated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Token generation failed' });
    }
};

// Logic for clearing the cookie on logout
const logoutUser = (req, res) => {
    res.clearCookie('token', { 
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    res.send({ success: true, message: 'Logged out successfully' });
};

module.exports = { generateToken, logoutUser };