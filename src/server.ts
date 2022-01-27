import express, {Express, Request, Response} from 'express';
import jwt from 'express-jwt';

import AuthController from './controllers/auth';

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(express.json());

// Auth routes
app.use('/auth', AuthController);


// de aqui en adelante los endpoints
// requieren un JSON Web TOKEN de un usuario logueado.
app.use(jwt({
  'secret': process.env.JWT_SECRET ?? 'NoSecrets',
  'algorithms': ['HS256'],
}));

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Listening on Port 3000'));
