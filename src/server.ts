import express, {Application, NextFunction, Request, Response} from 'express';
import jwt from 'express-jwt';

import AuthController from './controllers/auth';
import CardController from './controllers/cards';
import UserController from './controllers/users';

const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(express.json());

// Basic and test routes.
app.get('/hola',
    (req: Request, res: Response) => res.json({message: 'Hola Mundo!'}));

app.get('/hello',
    jwt({'secret': process.env.JWT_SECRET, 'algorithms': ['HS256']}),
    (req: Request, res: Response) => res.json({message: 'Hello World!'}));

// Auth routes
app.use('/auth', AuthController);

// Collection routes
app.use('/cards', CardController);

// User routes
app.use('/users', UserController);

app.get('*', function(req, res) {
  res.status(404).json({
    status: 404,
    message: 'The data requested could not be found',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized Request',
    });
  }
  return res.status(500).json({
    status: 500,
    message: 'Ha ocurrido un error inesperador',
    dump: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export const server =
  app.listen(3000, () => console.log('Listening on Port 3000'));

export default app;
