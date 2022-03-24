import { Router } from 'express';
import notesRouter from './notes.routes';
import sessionRouter from './session.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/notes', notesRouter);

export default routes;
