const mongoose = require('mongoose');
const User = require('../model/SessionModel');

const registerUser = async (req, res) => {
  try {
    const { username, balance } = req.body;

    const newUser = new User({ username, balance });
    await newUser.save();
    res
      .status(201)
      .json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
};
//
const session = async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    // Deduct funds from sender
    const sender = await User.findById(fromUserId).session(session);
    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }
    sender.balance -= amount;
    await sender.save();

    // Add funds to recipient
    const recipient = await User.findById(toUserId).session(session);
    recipient.balance += amount;
    await recipient.save();

    // Commit transaction if successful
    await session.commitTransaction();
    res.status(200).json({ message: 'Transfer completed successfully' });
  } catch (error) {
    // Abort transaction in case of error
    await session.abortTransaction();
    res.status(500).json({ message: 'Transfer failed', error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = { session, registerUser };
