const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const fetchShop = (req, res, next) => {
    const token = req.header('authToken');

    if (!token) {
        return res.status(401).json({
            error: "token required"
        });
    }

    try {
        req.id = jwt.verify(token, SECRET_KEY);
        next();

    } catch (error) {
        console.log(error)
        return res.json({
            error: "invalid token"
        });
    }

}


module.exports = fetchShop;