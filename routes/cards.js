const mongoose = require('mongoose');
const router = require('express').Router();
const { getCards, createCard, deleteCardById, putLikeCardById, deleteLikeCardById } = require('../controllers/cards');

// Проверка корректности id и обработка ошибок
function validateCardId(req, res, next) {
  const id = req.params.cardId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'incorrect id',
      err: 'Некорректный id',
    });
  }

  next();
}

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', validateCardId, deleteCardById);

router.put('/:cardId/likes', validateCardId, putLikeCardById);

router.delete('/:cardId/likes', validateCardId, deleteLikeCardById);

module.exports = router;