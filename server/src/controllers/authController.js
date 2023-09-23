import bcrypt from 'bcrypt'
import httpStatus from '../helpers/httpStatus.js'
import { generateToken } from '../helpers/generateToken.js'
import prisma from '../database/prisma.js'

const userControllers = () => {
  const register = async (req, res, next) => {
    try {
      const { body } = req

      const verifyUsername = await prisma.user.findFirst({
        where: { username: body.username }
      })

      if (verifyUsername !== null) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: 'This username already in use'
        })
      }

      const verifyEmail = await prisma.user.findFirst({
        where: { email: body.email }
      })

      if (verifyEmail !== null) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: 'This email already in use'
        })
      }

      const encryptedPassword = bcrypt.hashSync(body.password, 10)

      const dataUser = {
        ...body,
        password: encryptedPassword,
        role: 'user'
      }

      await prisma.user.create({ data: dataUser })

      return res.status(httpStatus.CREATED).json({
        success: true,
        message: 'Registered'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const login = async (req, res, next) => {
    try {
      const { body } = req

      const user = await prisma.user.findFirst({
        where: { username: body.username }
      })

      if (
        user === null ||
        !(await bcrypt.compare(body.password, user.password))
      ) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: 'Invalid credentials.'
        })
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role
      })

      return res.status(httpStatus.OK).json({
        success: true,
        token
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return { register, login }
}

export default userControllers