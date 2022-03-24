import { getRepository } from 'typeorm';
import Notes from '../models/Notes';

interface Request {
  title: string;
  description: string;
  user_id: string;
}

class CreateNoteService {
  public async execute({
    title,
    description,
    user_id,
  }: Request): Promise<Notes> {
    const noteRepository = getRepository(Notes);

    const notes = noteRepository.create({
      title,
      description,
      user_id,
    });

    await noteRepository.save(notes);

    return notes;
  }
}

export default CreateNoteService;
