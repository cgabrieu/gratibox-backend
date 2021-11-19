import './setup.js';
import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.post('/auth/sign-up', signUp);

export default app;
