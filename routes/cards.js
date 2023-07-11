const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getCards, createCard, deleteCardById, putLikeCardById, deleteLikeCardById,
} = require('../controllers/cards');

// возвращает все карточки
router.get('/', getCards);

// создаёт карточку
router.post('/', createCard);

// удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), deleteCardById);

// поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    likes: Joi.string().required(),
  }),
}), putLikeCardById);

// убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    likes: Joi.string().required(),
  }),
}), deleteLikeCardById);

module.exports = router;
