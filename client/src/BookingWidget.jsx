import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { UserContext } from './UserContext'
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuest] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState('')
  const {user}=useContext(UserContext)
  useEffect(() => {
    if(user){
        setName(user.name)
    }
    }, [user])
  let numberofNights = 0

  if (checkIn && checkOut) {
    numberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    )
  }
  async function bookthisPlace() {
    const bookingData = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberofNights * place.price,
      address: place.address,
    }
    const response = await axios.post('/bookings', bookingData)
    const bookingId = response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <div className="text-2xl text-center">
        Price: Rs {place.price}/ per Night 
      </div>
      <div className="border rounded-2xl mt-4 ">
        <div className="flex">
          <div className="px-4 py-4 ">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              required
            />
          </div>
          <div className="   px-3 py-4 border-l ">
            <label>Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <div className=" px-3 py-4 border-t ">
            <label>Number of Guest</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuest(ev.target.value)}
              required
            />
          </div>
          {numberofNights > 0 && (
            <div className=" px-3 py-4 border-t ">
              <label>Your Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                required
              />
              <label>Phone Number:</label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={phone}
                onChange={setPhone}
                required
              />
            </div>
          )}
        </div>
      </div>

      <button className="mt-4 primary" onClick={bookthisPlace}>
        Book this Place{' '}
        {numberofNights > 0 && (
          <span>for Rs {numberofNights * place.price}</span>
        )}
      </button>
    </div>
  )
}
BookingWidget.propTypes = {
  place: PropTypes.shape({
    price: PropTypes.number.isRequired,
  }).isRequired,
}
