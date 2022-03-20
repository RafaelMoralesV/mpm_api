import {Request, Response, Router} from 'express';
import express from 'express';

import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {generateToken} from '../lib/utils';
const prisma = new PrismaClient();

// eslint-disable-next-line new-cap
const router: Router = express.Router();

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(401).json({
      status: 401,
      message: 'One or more fields missing.',
    });
  }

  const user = await prisma.user.findFirst({where: {name: username}});

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: `No user found with username ${username}`,
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid password',
    });
  }

  res.header('auth-token', `Bearer ${generateToken(user)}`)
      .json({
        status: 200,
        message: 'user created sucessfully',
      });
});


// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  const {username, password, email}:
  {username:string, password:string, email:string} = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      status: 400,
      message: 'One or more fields missing.',
    });
  }

  if (await prisma.user.findFirst({where: {email: email}})) {
    return res.status(400).json({
      status: 400,
      message: 'A user with this email already exists',
    });
  }

  await prisma.user.create({
    data: {
      name: username,
      password: password,
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
    }});

  res.json({
    status: 200,
    message: 'El usuario fue creado correctamente.',
  });
});

export default router;

