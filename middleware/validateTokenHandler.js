const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken');

const validateTokenHandler = asyncHandler(async(req, res, next)=>{
    let token = '';
    const authentication = req.headers.authorization || req.headers.Authorization;
    if(authentication && authentication.startsWith('Bearer')) {
        token = authentication.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(400);
                throw new Error("User is not authenticated");
            }
            req.user = decoded.user;
            next();
        })
    }
    if(!token) {
        res.status(400);
        throw new Error("User is not authorized or token is missing");
    }
})

module.exports = validateTokenHandler;