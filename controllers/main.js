const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  // there are three diff way to check if the username and pass are provided:
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new CustomAPIError('Please Provide email and password', 400);
  }
  const id = new Date().getTime();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // try to keep paylod small, better exprience for user
  res.status(200).json({ msg: 'user created toke', token });
  console.log(username, password);
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const luckyNumber = Math.floor(Math.random() * 100) + 1;
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {}
};

module.exports = { login, dashboard };
