const express = require('express');
const router = express.Router()
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/incomes/create', async (req, res) => {
  console.log(req.body);

  const newUser = await prisma.incomes.create({
    data: {
      value: Number(req.body.value),
      user: {
        connect: {
          id: Number(req.body.userId)
        }
      },
      category: {
        connect: {
          id: Number(req.body.categoryId)
        }
      }
        
    }
  });

  res.send(newUser)
});

router.put('/incomes/update', async (req, res) => {
  console.log(req.body);

  const newUser = await prisma.incomes.update({
    where: {
        id: Number(req.body.id)
      },
      data: {
        value: Number(req.body.value),
        user: {
          connect: {
            id: Number(req.body.userId)
          }
        },
        category: {
          connect: {
            id: Number(req.body.categoryId)
          }
        }
          
      }
  });

  res.send(newUser)
});

router.delete("/incomes/delete", async (req, res) => {
    console.log(req.body);

    const newUser = await prisma.incomes.delete({
        where:{
            id: Number(req.body.id)
        },
    });
res.send(newUser)
});

module.exports = router;