import { Router } from "express";
import productsRoutes from "@modules/products/routes/products.routes";
import usersRoutes from "@modules/users/routes/users.routes";
import sessionsRoutes from "@modules/users/routes/sessions.routes";

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
