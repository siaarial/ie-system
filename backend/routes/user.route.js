const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const createToken = require('../auth/jwt');

const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  /*
  login: string;
  password: string;
  */

  const user = await prisma.user.findUnique({
    where: {
      login: req.body.login
    }
  });

  if (!user) {
    res.send('Пользователь не найден');
    return;
  }

  const isPasswordVerifyed = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordVerifyed) {
    res.send('Неправильный пароль');
    return;
  }

  const token = createToken(user.id);

  res.send({
    token
  });
});

router.post('/register', async (req, res) => {
  /*
  name: string;
  login: string;
  password: string;
  */

  const existingUser = await prisma.user.findUnique({
    where: {
      login: req.body.login
    }
  });

  console.log(existingUser);

  if (existingUser) {
    res.send('Пользователь с таким login уже зарегистрирован');
    return;
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const user = await prisma.user.create({
    data: {
      login: req.body.login,
      password: passwordHash,
      name: req.body.name
    }
  });

  const token = createToken(user.id);

  res.send({
    token,
    user
  });
})

router.post('/create', async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    }
  });

  res.send(newUser)
});

router.get('/profile', async (req, res) => {
    try {
        if (!req.headers.authorization) {
            res.send('Пользователь не авторизован!')
        }

        const userData = func.verifyToken(req.headers.authorization);
        const user = await prisma.user.findUnique({
          where: {
            id: Number(userData.userId)
          },
          include: {
            incomes: {
              include: {
                category: true,
              }
            },
            expenses: {
              include: {
                category: true,
              }
            }
          }
        });
      
        res.send(user);
    } catch (err) {
        res.send(err);
    }

})

module.exports = router;