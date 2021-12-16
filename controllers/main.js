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
  console.log(username, password);
  res.send('Fake Login/Register/Signup');
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
