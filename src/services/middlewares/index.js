// >> Here is where will
// declared the middlewares
const jwt = require('jsonwebtoken');
const config= require('../../services/jwt');

function verifyToken(req, res, next){
    //Header token
    const token = req.headers['x-access-token'];
    //If no token is provided, return 401
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }
    //Verify token
    const decoded= jwt.verify(token, config.secret);
    req.userId= decoded.id;
    next();
}

module.exports = verifyToken;
