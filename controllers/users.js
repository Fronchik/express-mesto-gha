const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res
      .status(500)
      .send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({
          message: 'User not found',
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Invalid data',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Creation Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateProfileUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found',
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Invalid data',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Update Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user && user.avatar === avatar) {
        res.status(200).send(user);
      } else {
        res.status(400).json({
          message: 'Avatar URL in response does not match the requested URL',
          err: 'Invalid avatar URL',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Invalid data',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Update Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfileUser,
  updateAvatarUser,
};