import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Notes from '../models/Notes';

interface Request {
  user_id: string;
}

class ListAllNotes {
  public async execute({ user_id }: Request): Promise<Notes[]> {
    const noteRepository = getRepository(Notes);
    const notes = await noteRepository.find({
      where: { user_id },
    });

    if (!user_id) {
      throw new AppError('Only authenticated users can get notes', 401);
    }

    if (!notes) {
      throw new AppError('None of notes is found', 404);
    }
    return notes;
  }
}

export default ListAllNotes;
