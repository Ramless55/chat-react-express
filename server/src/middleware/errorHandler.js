import httpStatus from '../helpers/httpStatus.js'

const ERROR_HANDLERS = {
  ReferenceError: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).send({
      error: err.name,
      cause: err.message,
      message:
        'internal error please know sorry, error in finding Id check controllers'
    })
  },
  Error: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).send({
      error: err.name,
      cause: err.message,
      message: 'Enter your data to register'
    })
  },
  CastError: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).send({
      error: err.name,
      cause: err.message,
      message: 'The ID you entered is incorrect, please enter a new one'
    })
  },
  MongoServerError: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).send({
      error: err.name,
      cause: err.message,
      message: 'There is already information about it, try with a new data'
    })
  },
  SyntaxError: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).send({
      error: err.name,
      cause: err.message,
      message: 'typing error, please check the data'
    })
  },
  ValidationError: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).send({
      error: err.name,
      cause: err.message,
      message:
        'The data you entered does not exist, data is missing or exceeds the maximum number of characters, check your writing'
    })
  },
  defaultError: (res, err) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: err.name, cause: err.message })
  }
}

const errorHandler = (err, req, res, next) => {
  console.log('ERROR HANDLER')
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}

export default errorHandler
