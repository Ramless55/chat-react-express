import httpStatus from "../helpers/httpStatus.js";
import prisma from "../database/prisma.js";

const messageControllers = () => {
  const postMessage = async (req, res, next) => {
    try {
      const { message } = req.body

      const data = {
        message,
        authorId: req.userId
      }

      await prisma.message.create({ data })

      return res.status(httpStatus.CREATED).json({
        success: true,
        message: 'message saved'
      })

    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getAllMessage = async (_req, res, next) => {
    try {
      const messages = await prisma.Message.findMany({ take: 100, orderBy: { createdAt: 'desc' } })
      const users = await prisma.user.findMany()

      const reverseMessages = messages.reverse();

      const workedMessages = reverseMessages.map(message => {
        const username = users.filter(user => user.id === message.authorId)[0].username
        return {
          body: {
            message: message.message,
            id: message.authorId
          },
          from: username
        }
      })

      return res.status(httpStatus.OK).json({
        success: true,
        message: workedMessages
      })

    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return { postMessage, getAllMessage }
}

export default messageControllers