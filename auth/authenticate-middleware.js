const jwt = require('jsonwebtoken');

/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err)
          res.status(401).json({you: 'shall not pass!'});

        req.token = decodedPayload;
        next();
      })
    } else {
      res.status(401).json({you: 'Fuck Off Biatch! from "Jessy Pinkman"'});
    }
  }catch {
    res.status(401).json({you: 'shall not pass here!'});
  }
};
