const express = require('express');
const router = express.Router()
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/expenses/create', async (req, res) => {
  console.log(req.body);

  const newUser = await prisma.expenses.create({
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

router.put('/expenses/update', async (req, res) => {
  console.log(req.body);

  const newUser = await prisma.expenses.update({
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

router.delete("/expenses/delete", async (req, res) => {
    console.log(req.body);

    const newUser = await prisma.expenses.delete({
        where:{
            id: Number(req.body.id)
        },
    });
res.send(newUser)
});

module.exports = router;