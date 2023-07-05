const mongoose = require('mongoose');
const router = require('express').Router();
const { getUsers, getUserById, createUser, updateProfileUser, updateAvatarUser } = require('../controllers/users');

// Проверка корректности id и обработка ошибок
function validateId(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'incorrect id',
      err: 'Некорректный id',
    });
  }

  next();
}

// Проверка корректности name и обработка ошибок
// function validateName(req, res, next) {
//   const name = req.params.name;

//   if (!mongoose.Types.ObjectId.isValid(name)) {
//     return res.status(400).json({
//       message: 'Invalid data',
//       err: 'Invalid data',
//     });
//   }

//   next();
// }

router.get('/', getUsers);

router.get('/:id', validateId, getUserById);

router.post('/', createUser);

router.patch('/me', updateProfileUser);

router.patch('/me/avatar', updateAvatarUser);

module.exports = router;