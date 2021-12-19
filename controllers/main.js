const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors/bad-request');

const login = async (req, res) => {
  const { username, password } = req.body;
  // there are three diff way to check if the username and pass are provided:
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequest('Please Provide email and password');
  }
  const id = new Date().getTime();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // try to keep paylod small, better exprience for user
  res.status(200).json({ msg: 'user created toke', token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
