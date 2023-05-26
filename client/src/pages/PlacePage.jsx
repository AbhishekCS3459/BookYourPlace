import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget'
import PlaceGallery from '../PlaceGallery'
import AddressLink from '../AddressLink'

export default function PlacePage() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/places/${id}`).then((response) => {
      const place = response.data
      // console.log(place)
      setPlace(place)
    })
  }, [id])
  if (!place) {
    return <div>Loading...</div>
  }
  return (
    <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>
        {place.address}
      </AddressLink>
      <PlaceGallery place={place} />

      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in:
          {place.checkIn}
          <br />
          Check-out:
          {place.checkOut}
          <br />
          Max Number of Guests:{place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
          {place.extraInfo}
        </div>
      </div>
    </div>
  )
}
