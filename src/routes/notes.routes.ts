import { Router } from 'express';
import ensureAuthenticated from '../middlewares/EnsureAuthenticaded';
import CreateNoteService from '../services/CreateNotesService';
import ListAllNotes from '../services/ListAllNotes';

const notesRouter = Router();

notesRouter.use(ensureAuthenticated);

notesRouter.get('/', async (request, response) => {
  try {
    const listNotesService = new ListAllNotes();

    const notes = await listNotesService.execute({ user_id: request.user.id });
    return response.json(notes);
  } catch (err) {
    return response.status(400).json(err);
  }
});

notesRouter.post('/', async (request, response) => {
  const { title, description } = request.body;
  const createNotes = new CreateNoteService();

  const notes = await createNotes.execute({
    title,
    description,
    user_id: request.user.id,
  });

  return response.json(notes);
});

export default notesRouter;
