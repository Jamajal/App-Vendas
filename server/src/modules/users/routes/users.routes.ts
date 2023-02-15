import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.getAll);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
);

export default usersRoutes;
