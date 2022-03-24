import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
// import AppError from '../errors/AppError';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('E-mail already in use');
    }

    const hashedPassowrd = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassowrd,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
