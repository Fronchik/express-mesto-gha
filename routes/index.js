const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.patch('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

module.exports = router;
