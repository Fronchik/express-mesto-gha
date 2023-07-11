const Card = require('../models/card');
const CardNotFound = require('../components/CardNotFound');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new CardNotFound();
      }
      res.status(200).send({
        message: 'Card deleted successfully',
      });
    })
    .catch(next);
};

const putLikeCardById = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new CardNotFound();
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

const deleteLikeCardById = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new CardNotFound();
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLikeCardById,
  deleteLikeCardById,
};
