import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb';


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})
app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.put('/usuarios/:id', async (req, res) => {


    const user = await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })
    res.status(200).json(user)
})
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await prisma.user.delete({
      where: {
        id: new ObjectId(id) 
      }
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


