import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../services/axiosServices-users';
import { useLogin } from '../store/useLogin';

export default function LoginForm () {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorLogin, setErrorLogin] = useState(false)
  const [messageError, setMessageError] = useState('')

  const { setIsLogged } = useLogin()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogged(true)
      navigate('/chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userLogin(formData)

    if (response.error !== '') {
      setMessageError(response.message)
      return setErrorLogin(true)
    }

    setIsLogged(true)
    localStorage.setItem('token', response.response.token)
    navigate('/chat')
  }

  return (
    <main className='flex h-screen justify-center'>
      <div className=' w-96 h-fit rounded-xl flex flex-col items-center p-10 '>
        <img src="../../public/logo.png" alt="" />

        {errorLogin ? <div className="alert alert-error mb-4">
          <span>{messageError}</span>
        </div> : null}

        <form onSubmit={handleSubmit} className='flex flex-col w-full h-full mb-4'>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className='input input-bordered min-w-fit mb-4'
            placeholder="Username"
          />
          <div className='w-full '>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className='input input-bordered mb-4 w-full'
              placeholder="Password"
            />
          </div>
          <button className='btn btn-secondary' type="submit">Log in</button>
        </form>
        <a href="/register" className='border-b-2 border-white hover:border-secondary'>Create Account</a>
        <a href="" className='border-b-2 border-white hover:border-secondary'>Forgot Password?</a>
        <div className="divider">OR</div>
        <button className='btn'><img className='h-8 w-8' src="../../public/google.svg" alt="" /> Login with Google</button>
      </div>
    </main>
  );
}
