import express, { Express, Request, Response } from 'express';

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.write('Hello!');
    res.statusCode = 200;
});

app.post('/login', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    res.send(`Username: ${username}\tPassword:${password}`);
});

app.listen(3000, () => console.log('Listening on Port 3000'));