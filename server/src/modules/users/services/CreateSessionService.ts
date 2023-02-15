import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import authConfig from '@config/auth';

interface IRequest {
  email: string,
  password: string
};

interface IResponse {
  user: User,
  token: string
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if(!user)
      throw new AppError("Incorrect email/password combination", 401);

    const passwordConfirmation = await compare(password, user.password);

    if(!passwordConfirmation)
      throw new AppError("Incorrect email/password combination", 401);

    const token = sign({}, authConfig.jwt.secret, { // Secret gerada no site md5.sz
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    }
  }
}
