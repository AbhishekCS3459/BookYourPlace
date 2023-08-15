import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AccountNav from '../AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import { UserContext } from "../UserContext";
export default function PlacesPage() {
  const [places, setPlaces] = useState([])
  const { user, ready } = useContext(UserContext);

  useEffect(() => {
    try {
      axios.get('/myplaces').then((response) => {
        setPlaces(response.data);
      });
    } catch (error) {
      console.error('An error occurred while fetching places:', error);
    }
  }, [user,ready]);
  return (
    <div>
      <AccountNav />

      <div className=" text-center">
        <Link
          className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              className="flex cursor-pointer bg-gray-100 gap-4 shadow-lg mb-5
              shadow-stone-400 p-4 rounded-2xl "
              key={place}
              to={`/account/places/${place._id}`}
            >
              <div className="w-32  h-32 grow-0 shrink-0  ">
               <PlaceImg  place={place} />
              </div>

              <h2 className="text-xl">{place.title}</h2>
              <div className="grow-0 shrink ">
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
