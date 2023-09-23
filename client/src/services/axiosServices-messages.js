import axios from "axios";

export const postMessage = async (data) => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${import.meta.env.VITE_URI}/api/message`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return {
      error: '',
      response: response.data
    }
  } catch (error) {
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
      error: error.name,
      message: error
    };
  }
}

export const getAllMessages = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${import.meta.env.VITE_URI}/api/message`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return {
      error: '',
      response: response.data
    }
  } catch (error) {
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
      error: error.name,
      message: error
    };
  }
}