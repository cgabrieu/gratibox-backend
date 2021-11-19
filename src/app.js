import './setup.js';
import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp.js';
import signIn from './controllers/signIn.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.post('/auth/sign-up', signUp);
app.post('/auth/sign-in', signIn);

export default app;
