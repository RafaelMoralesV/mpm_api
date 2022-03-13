import {Request, Response, Router} from 'express';
import jwtgenerator from 'jsonwebtoken';
import db from '../models';
import express from 'express';
import UserAttributes from '../interfaces/user';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

/**
 * Generates a new JWT Token.
 * @param {UserAttributes} user
 * @return {Promise<String>}
 */
function generateToken(user: UserAttributes): Promise<String> {
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
        {sub: user.id},
        process.env.JWT_SECRET ?? 'NoSecrets',
        {expiresIn: '1h'},
        (err, tokenResult) => tokenResult ? resolve(tokenResult) : reject(err),
    );
  });
}

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(401).send('One or more fields missing.');
  }

  const user = await db.User.findOne({where: {name: username}});

  if (!user) {
    return res.status(404).send(`No user found with username ${username}`);
  }

  const authenticated = await user.checkPassword(password);
  if (!authenticated) {
    return res.status(401).send('Invalid password');
  }

  const token = await generateToken(user);

  res.json({
    id: user.id,
    access_token: token,
    token_type: 'Bearer',
  });
});


// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  const {username, password, email}:
  {username:string, password:string, email:string} = req.body;

  if (!username || !password || !email) {
    return res.status(401).send('One or more fields missing.');
  }

  if (await db.User.findOne({where: {email}})) {
    return res.status(401).send('A user with this email already exists');
  }

  db.User.create({
    name: username,
    password: password,
    email: email,
  });

  res.send('OK');
});

export default router;

