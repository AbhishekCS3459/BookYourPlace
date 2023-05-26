import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import AddressLink from '../AddressLink'
import PlaceGallery from '../PlaceGallery'
import BookingDate from './BookingDate'

export default function BookingPage() {
  const [booking, setBooking] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    document.title = 'HotelWala | Booking'
  }, [])

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
       
        if (foundBooking) {
         console.log(foundBooking)
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  

  if(!booking)
    return(<div className='my-8'>
        LOADING....</div>)

  return <div className='my-8'>
     <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink className={"my-2 block"}>{booking.place.address}</AddressLink>
       <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
        <h2 className="text-xl">
          Your Booking Information
          <BookingDate booking={booking} />
        </h2>
       </div>
       <PlaceGallery place={booking.place} />
  </div>
}
