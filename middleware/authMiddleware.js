// Middleware code
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).send({
          message: "Authorization failed",
          success: false,
        });
      } else {
        console.log("Decoded Payload:", decoded);
        req.user = decoded.id; 
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Authorization failed",
      success: false,
    });
  }
};
