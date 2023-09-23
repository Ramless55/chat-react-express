import axios from "axios";

export const userLogin = async (data) => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", data);
    return {
      error: '',
      response: response.data
    }
  } catch (error) {
    if (error.response)
      return {
        error: 'response',
        response: error.response.data,
        message: 'Invalid username or password'
      }

    if (error.request)
      return {
        error: 'request',
        message: 'Can not connect to server'
      };

    return {
      error: "unknown",
      message: 'Unknown error'
    };
  }
};

export const userRegister = async (data) => {
  try {
    const response = await axios.post("http://localhost:4000/auth/register", data);
    return {
      error: '',
      response: response.data
    }
  } catch (error) {
    console.log(error.response)
    if (error.response)
      return {
        error: 'response',
        response: error.response.data,
        message: error.response.data.message
      }

    if (error.request)
      return {
        error: 'request',
        message: 'Can not connect to server'
      };

    return {
      error: "unknown",
      message: 'Unknown error'
    };
  }
};