import {Request, Response, Router} from 'express';
import express from 'express';
import db from '../models';
import {Card} from '../models/card';
import jwt from 'express-jwt';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

// Estas rutas estan protegidas bajo un JWT.
router.use(jwt({'secret': process.env.JWT_SECRET, 'algorithms': ['HS256']}));

// GET / - Obtiene una lista de todas las cartas.
router.get('/', async (req: Request, res: Response) => {
  const collection: Array<Card> =
        await db.Card.findAll({where: {UserId: req.user!.id}});
  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});


router.get('/:userId', async (req: Request, res: Response) => {
  const collection: Array<Card> =
      await db.Card.findAll({where: {UserId: req.params.userId}});

  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});


router.put('/', async (req: Request, res: Response) =>{
  const user = await db.User.findOne({where: {id: req.user!.id}});

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: 'No se ha podido verificar tu usuario',
    });
  }

  const {stock, id}= req.body;
  db.Card.update(
      {stock: stock},
      {where: {id: id, UserId: user.id}, fields: ['stock']},
  );
  return res.json({
    status: 200,
    message: 'Stock de la carta actualizado',
  });
});


router.post('/', async (req: Request, res: Response) => {
  const {name, uuid, stock} = req.body;

  db.Card.create({
    name: name,
    uuid: uuid,
    stock: stock,
    UserId: req.user!.id,
  });

  return res.json({
    status: 200,
    message: 'La carta se agregó con éxito.',
  });
});

export default router;
