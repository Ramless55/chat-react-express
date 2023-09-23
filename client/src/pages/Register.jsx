import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { userRegister } from "../services/axiosServices-users";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ErrorComponent ({ errors, name }) {
  return (<ErrorMessage
    errors={errors}
    name={name}
    render={({ messages }) =>
      messages &&
      Object.entries(messages).map(([type, message]) => (
        <label className="label" key={type}>
          <span className="label-text-alt text-error" key={type}>{message}</span>
        </label>
      ))
    } />)
}

export default function RegisterForm () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    criteriaMode: "all"
  });
  const [errorRegister, setErrorRegister] = useState(false)
  const [messageError, setMessageError] = useState('')

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const repeatPasswordDeleted = data
    delete repeatPasswordDeleted.repeatPassword
    const response = await userRegister(repeatPasswordDeleted)
    console.log(response)

    if (response.error !== '') {
      setMessageError(response.message)
      return setErrorRegister(true)
    }

    navigate('/chat')
  });

  return (
    <main className='flex h-screen justify-center'>
      <div className=' w-96 h-fit rounded-xl flex flex-col items-center '>
        <img className='h-72 ' src="../../public/logo.png" alt="" />

        {errorRegister ? <div className="alert alert-error mb-4">
          <span>{messageError}</span>
        </div> : null}

        <form onSubmit={onSubmit} className='flex flex-col w-full h-full mb-4'>

          {/* username */}
          <input
            type="text"
            className='input input-bordered min-w-fit'
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: 'Username requires 3 characters minimum'
              },
              maxLength: {
                value: 15,
                message: "maximum characters exceeded (15)"
              }
            })}
          />
          <ErrorComponent errors={errors} name="username" />

          {/* email */}
          <input
            type="text"
            className='input input-bordered min-w-fit mt-4'
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid format"
              }
            })}
          />
          <ErrorComponent errors={errors} name="email" />

          {/* password */}
          <div className='w-full mt-4 label-text'>
            <p className={errors.password ? " hidden" : null}>Password needs 1 uppercase, 1 number and 8 characters</p>
            <input
              type="password"
              className='input input-bordered w-full'
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password requires 8 character minimum"
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+/,
                  message: "Password needs uppercase and a number"
                },
                maxLength: {
                  value: 20,
                  message: "maximum characters exceeded (20)"
                }
              })}
            />
            <ErrorComponent errors={errors} name="password" />
          </div>

          {/* repeat password */}
          <input
            type="password"
            className='input input-bordered min-w-fit mt-4'
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              validate: value => value === watch("password") || "Passwords must be the same"
            })}
          />
          <ErrorComponent errors={errors} name="repeatPassword" />

          <button className='btn btn-secondary mt-4' type="submit">Register</button>
        </form>
        <a href="/" className='border-b-2 border-white hover:border-secondary'>Back to Login</a>
        <div className="divider">OR</div>
        <button className='btn'><img className='h-8 w-8' src="../../public/google.svg" alt="" /> Login with Google</button>
      </div>
    </main>
  );
}
