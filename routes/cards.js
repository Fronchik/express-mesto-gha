const router = require('express').Router();
const { getCards, createCard, deleteCardById, putLikeCardById, deleteLikeCardById } = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', putLikeCardById);

router.delete('/:cardId/likes', deleteLikeCardById);

module.exports = router;