/* eslint-disable require-jsdoc */
import {Request, Response, Router} from 'express';
import jwtgenerator from 'jsonwebtoken';
import db from '../models';
import express from 'express';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

function generateToken(user: any) {
  const secret: string = process.env.JWT_SECRET ?? 'NoSecrets';
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
        {sub: user.id},
        secret,
        {expiresIn: '1h'},
        (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

router.post('/', async (req: Request, res: Response) => {
  const {username, password} = req.body;
  const user = await db.User.findOne({where: {name: username}});

  if (!user) res.status(404).send(`No user found with username ${username}`);

  const authenticated = await user.checkPassword(password);
  if (!authenticated) res.status(401).send('Invalid password');

  const token = await generateToken(user);

  res.json({
    id: user.id,
    access_token: token,
    token_type: 'Bearer',
  });
});

export default router;

