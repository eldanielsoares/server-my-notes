import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateuserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const createSession = new AuthenticateUserService();

  const { user, token } = await createSession.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
