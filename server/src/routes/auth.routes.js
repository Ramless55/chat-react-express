import { Router } from "express";
import authControllers from "../controllers/authController.js";

export const authRouter = () => {
  const router = Router()

  const { login, register } = authControllers()

  router.route('/auth/login').post(login)

  router.route('/auth/register').post(register)

  return router
}