const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => res
      .status(500)
      .send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        return res.status(400).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(500).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const deleteCardById = (req, res) => {
  Card.deleteById(req.params.id)
    .orFail(() => new Error('Not found'))
    // .then((card) => res.status(200).send(card))
    .then((card) => res.status(200).json({ card }))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'Card not found',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

const putLikeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    // .then((card) => res.status(400).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'Card not found',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

const deleteLikeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    // .then((card) => res.status(400).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'Card not found',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLikeCardById,
  deleteLikeCardById,
};