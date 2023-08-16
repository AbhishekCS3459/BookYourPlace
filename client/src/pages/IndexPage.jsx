import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces([...response.data])
    })
  }, [])
  const shortit = (address) => {
    const number_words = address.split(' ').filter(function (num) {
      return num != ''
    }).length
    if (number_words >=5 || address.length > 15) {
      const short_address = address
        .split(' ')
        .filter(function (num, index) {
          return index < 3
        })
        .join(' ')  
      return short_address + '...'
    }

    return address
  }
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={place._id} to={`/place/${place._id}`}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={'https://backend-book-3fsl.onrender.com/uploads/' + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{shortit(place.address)}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">Rs {place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  )
}
