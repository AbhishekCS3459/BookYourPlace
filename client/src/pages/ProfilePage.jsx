import {  Navigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react' // Add the useContext import
import { UserContext } from '../UserContext'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'

export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext) // Use the useContext hook
  const [redirect, setRedirect] = useState(null)
  let { subpage } = useParams()
  if (subpage === undefined) subpage = 'profile'

  if (!ready) return 'loading...'
  
{/* <ClockLoader color="#36d7b7" /> */}
  if (!user && ready && !redirect) return <Navigate to={'/login'} />


  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
     <AccountNav/>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button onClick={logout} className="primary max-w-md mt-2 text-white">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  )
}
