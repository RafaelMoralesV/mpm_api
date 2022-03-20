import {Request, Response, Router} from 'express';
import express from 'express';
import jwt from 'express-jwt';

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

// eslint-disable-next-line new-cap
const router: Router = express.Router();

// Estas rutas estan protegidas bajo un JWT.
router.use(jwt({'secret': process.env.JWT_SECRET, 'algorithms': ['HS256']}));

// GET / - Obtiene una lista de todas las cartas.
router.get('/', async (req: Request, res: Response) => {
  const collection =
    await prisma.card.findMany({where: {UserId: req.user!.id}});
  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});


router.get('/:userId', async (req: Request, res: Response) => {
  const id: number = Number(req.params.userId);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: 'The sent id is not valid.',
    });
  }

  const collection = await prisma.card.findMany({where: {UserId: id}});

  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});


router.put('/', async (req: Request, res: Response) =>{
  const {stock, id}= req.body;
  await prisma.card.updateMany({
    where: {
      id: id,
      UserId: req.user!.id,
    },
    data: {stock: stock},
  });
  return res.json({
    status: 200,
    message: 'Stock de la carta actualizado',
  });
});


router.post('/', async (req: Request, res: Response) => {
  const {name, uuid, stock} = req.body;

  await prisma.card.create({
    data: {
      name: name,
      uuid: uuid,
      stock: stock,
      UserId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return res.json({
    status: 200,
    message: 'La carta se agregó con éxito.',
  });
});

export default router;
