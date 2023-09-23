import { Router } from "express";
import messageControllers from "../controllers/messageController.js";
import { verifyToken } from '../middleware/authToken.js'

export const messageRouter = () => {
  const router = Router()

  const { postMessage, getAllMessage } = messageControllers()

  router.route('/message')
    .post(verifyToken, postMessage)
    .get(verifyToken, getAllMessage)

  return router
}