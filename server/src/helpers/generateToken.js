import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
  const token = jwt.sign(
    {
      data: payload
    },
    process.env.SECRET
    // , { expiresIn: '1d' }
  )
  console.log(token)
  return token
}

const getTokenData = (token) => {
  let data = null
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log('Error al obtener data del token', err)
    } else {
      data = decoded
    }
  })
  return data
}

export { generateToken, getTokenData }
