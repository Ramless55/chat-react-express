import { decodeToken } from "react-jwt"

export default function getDataToken (token) {
  try {
    return decodeToken(token)
  } catch (err) {
    return err
  }
}
