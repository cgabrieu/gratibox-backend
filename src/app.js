import './setup.js';
import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp.js';
import signIn from './controllers/signIn.js';
import subscribe from './controllers/subscribe.js';
import authenticationJWT from './middlewares/authenticationJWT.js';
import subscriptionDetails from './controllers/subscription-details.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/sign-up', signUp);
app.post('/auth/sign-in', signIn);

app.post('/subscribe', authenticationJWT, subscribe);
app.get('/subscription', authenticationJWT, subscriptionDetails);

export default app;
