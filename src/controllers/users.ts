import {Request, Response, Router} from 'express';
import express from 'express';
import jwt from 'express-jwt';
import {User} from '../models/user';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

router.use(jwt({'secret': process.env.JWT_SECRET, 'algorithms': ['HS256']}));

router.get('/friends', async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: {id: req.user!.id},
    include: {
      model: User,
      as: 'friends',
      attributes: ['name', 'email', 'createdAt'],
      through: {
        attributes: ['createdAt', 'confirmed'],
        as: 'friendship',
      },
    },
  });

  return res.json({
    status: 200,
    size: user!.friends?.length,
    data: user!.friends,
  });
});

export default router;
