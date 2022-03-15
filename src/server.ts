import express, {Application, Request, Response} from 'express';
import jwt from 'express-jwt';

import AuthController from './controllers/auth';
import CardController from './controllers/cards';

const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(express.json());

// Auth routes
app.use('/auth', AuthController);

app.get('/hola', (req: Request, res: Response) => {
  res.send('Hola Mundo!');
});

// de aqui en adelante los endpoints
// requieren un JSON Web TOKEN de un usuario logueado.
app.use(jwt({
  'secret': process.env.JWT_SECRET,
  'algorithms': ['HS256'],
}), (err: any, req: Request, res: Response, next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token.').end();
  }
});

app.use('/cards', CardController);

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Listening on Port 3000'));
