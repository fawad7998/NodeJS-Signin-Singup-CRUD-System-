const schema = require('../model/userSchema');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
  console.log('Register endpoint hit');
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await schema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log({
      email,
      name,
      password: hashPassword,
    });
    const newUser = await schema.create({
      email,
      name,
      password: hashPassword,
    });

    console.log(hashPassword);

    res.status(201).json({
      newUser,
      message: 'User Created Successfully',
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await schema.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: 'Invalid credentials!' });

    res.status(200).json({ message: 'Login Successfully' });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  Register,
  login,
};
