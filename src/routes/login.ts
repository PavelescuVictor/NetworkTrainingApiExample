import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import { secret } from '../middlewares/jwtAuth';

const loginRoute = Router();

const staticUsername = 'Victor';
const staticPassword = 'test';

loginRoute.post('/', (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (username !== staticUsername && password !== staticPassword) {
    res.send(403);
  }

  const token = sign(
    {
      sub: '1234567',
      iss: 'Victors Server',
      usr: 'Victor Pavelescu',
    },
    secret,
    { expiresIn: '1m' }
  );

  res.json({
    token,
    expiresIn: 1000 * 15 * 1,
  });
});

loginRoute.post('/', (req, res) => {
  res.send(200);
});

export default loginRoute;
