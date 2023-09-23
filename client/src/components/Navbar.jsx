import { useNavigate } from 'react-router-dom'
import getDataToken from '../auth/getToken'
import { useState } from 'react'

export default function Navbar () {
  const token = localStorage.getItem('token')
  const [username] = useState(getDataToken(token).data.username)

  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.clear('token')
    navigate('/')
  }

  return (
    <div className="navbar bg-slate-900 fixed z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-slate-50">VariedTastes</a>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input type="text" placeholder="Search" className="w-24 md:w-auto input input-ghost bg-slate-800 text-slate-50 focus:text-slate-50 mr-4" />
        </div> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-secondary btn-circle avatar flex flex-col mr-24 hover:text-secondary">
            <div className="w-10 rounded-full flex justify-center items-center">
              <img src="../../public/profile-icon.png" />
            </div>
            <p className=' absolute left-14 bottom-2'>{username}</p>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleClick} >Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
