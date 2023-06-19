const express = require('express');
const router = express.Router()
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/create', async (req, res) => {
  console.log(req.body);

  const newUser = await prisma.user.create({
    data: {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    }
  });

  res.send(newUser)
});

router.put("/update", async (req, res) => {
    console.log(req.body);

    const newUser = await prisma.user.update({
        data: {
            login: req.body.login,
            password: req.body.password,
            name: req.body.name
        }
    });

    res.send(newUser)
});

router.delete("/delete", async (req, res) => {
    console.log(req.body);

    const newUser = await prisma.user.delete({
        where:{
            id: Number(req.body.id)
        }
    });
res.send(newUser)
});

module.exports = router;