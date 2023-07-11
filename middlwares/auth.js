const jwt = require('jsonwebtoken');

// аутентификация пользователя на основе токена
const auth = (req, res, next) => {
  // токен из куки запроса
  const token = req.cookies.jwt;

  // храниться расшифрованная информация из токена
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    res.status(401).send({ message: 'Ошибка авторизации' });
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
