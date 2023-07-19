import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const { data } = await axios.post('/login', { email, password })
      setUser(data)
      setRedirect(true)
      setTimeout(() => {
      
      }, 2000)

    } catch (e) {
      alert('Login Invalid')
      console.log(e)
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
   
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-bold">Welcome to HotelWala🏨</h1>
      
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Dont have account yet?{' '}
            <Link className="underline text-black" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
