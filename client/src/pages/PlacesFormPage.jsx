import { useEffect, useState } from 'react'
import axios from 'axios'
import PhotosUploader from '../PhotosUploader'
import Perks from '../Perks'
import AccountNav from '../AccountNav'
import { Navigate, useParams } from 'react-router-dom'
export default function PlacesFormPage() {
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])

  const [description, setDescription] = useState('')

  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setcheckIn] = useState('')
  const [checkOut, setcheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [price, setPrice] = useState(100)
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/places/${id}`).then((response) => {
      const place = response.data
      setTitle(place.title)
      setAddress(place.address)

      setAddedPhotos(place.Photos)

      setDescription(place.description)
      setPerks(place.perks)
      setExtraInfo(place.extraInfo)
      setcheckIn(place.checkIn)
      setcheckOut(place.checkOut)
      setMaxGuests(place.maxGuests)
      setPrice(place.price)
    })
  }, [id])

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>
  }
  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>
  }
  
  const savePlace = async (ev) => {
    ev.preventDefault()
    const placesData = {
      title,
      address,
      addedPhotos,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      perks,
      price,
    }
    if (id) {
      //update
      await axios.put('/places', {
        id,
        ...placesData,
      })
    } else {
      // newplace
      await axios.post('/places', placesData)
    }
    setRedirect(true)
  }

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }
  if (redirect) return <Navigate to="/account/places" />
  return (
    <>
      <div className="text-[10px] sm:text-lg">
        <AccountNav />

        <form onSubmit={savePlace}>
          {preInput(
            'Title',
            'Title/Heading for your Place,should be short and Eye Catchy',
          )}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title: Name of Hotel"
          />
          {preInput('Address', 'Address your Place')}

          <input
            type="text"
            placeholder="Address:"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          {preInput(
            'Photos',
            'Add photos of your place,more photos==more bookings',
          )}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {preInput('Description', 'Description of the Place')}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput('Perks', 'Select all the Perks of Your Place')}
          <Perks selected={perks} onChange={setPerks} />

          {preInput('Extra Info', 'House Rules, Cancellation Policy, etc.')}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            'Check In & Out times',
            'add check in and check out times,rembeber to have some time window for cleaning the room between guests',
          )}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check In Time</h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(ev) => setcheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check Out Time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setcheckOut(ev.target.value)}
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of Guest</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per Night Rs</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-primary my-4 w-96 lg:w-[700px] rounded-xl text-white ">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
