import {Request, Response, Router} from 'express';
import express from 'express';
import db from '../models';
import CardAttributes from '../interfaces/card';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

// GET / - Obtiene una lista de todas las cartas.
router.get('/', async (req: Request, res: Response) => {
  const collection: Array<CardAttributes> =
        await db.Card.findAll({user_id: req.user});
  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});


router.get('/:userID', async (req: Request, res: Response) => {
  const collection: Array<CardAttributes> =
      await db.Card.findAll({user_id: req.query.user_id});

  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});


router.put('/', async (req: Request, res: Response) =>{
  const user= await db.User.findOne(req.user);
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
    UserId: req.user?.id,
  });

  return res.json({
    status: 200,
    message: 'La carta se agregó con éxito.',
  });
});

export default router;
