const jwt = require('jsonwebtoken');
require('dotenv').config();

async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).json({ error: 'Server configuration error' });
        }

        let token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: 'No token provided.' });

        if (token.startsWith('Bearer ')) token = token.slice(7).trim();

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id }; // Set req.user with _id field
        console.log("the token of user at middleware is: ",token);
        console.log("request user at auth: ",req.user);
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ error: 'Token verification failed.' });
    }
}

module.exports = {
    restrictToLoggedinUserOnly
};
