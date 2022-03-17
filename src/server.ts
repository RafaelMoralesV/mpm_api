import express, {Application, NextFunction, Request, Response} from 'express';

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

app.use('/cards', CardController);

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
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

app.listen(3000, () => console.log('Listening on Port 3000'));
