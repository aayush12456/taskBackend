const jwt = require('jsonwebtoken');

const verifyRole = (roles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'registersData');

            if (roles.includes(decoded.role)) {
                req.user = decoded; // Attach user info to request
                next();
            } else {
                res.status(403).send({ mssg: "Access Denied: Insufficient Permissions" });
            }
        } catch (e) {
            res.status(401).send({ mssg: "Unauthorized: Invalid Token" });
        }
    };
};

module.exports = verifyRole;
