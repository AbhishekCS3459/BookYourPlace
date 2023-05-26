import { Link, Navigate } from 'react-router-dom'
import {  useState } from 'react'
import axios from 'axios'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const registerUser = async (ev) => {
    ev.preventDefault()
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      })
        alert('Registration Success')
        setRedirect(true)
    } catch (e) {
      alert('Registration Failed Please try again later')
    }
  }
  if (redirect) {
    return <Navigate to="/login" />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-bold font-serif">Register</h1>
      
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="username: username must be between 0-10"
            value={name}
            onChange={(ev) => setName(ev.target.value.slice(0, 10))}
          />
          <input
            type="email"
            placeholder="youremail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a Member?{' '}
            <Link className="underline text-black" to={'/login'}>
              Login{' '}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
