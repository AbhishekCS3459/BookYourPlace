import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDate from "./BookingDate";
import { ClockLoader } from "react-spinners";
export default function BookingPage() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    document.title = "HotelWala | Booking";
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      if (id) {
        try {
          const response = await axios.get("/bookings");
          const foundBooking = response.data.find(({ _id }) => _id === id);

          if (foundBooking) {
            setBooking(foundBooking);
          }
        } catch (error) {
          // Handle the error, e.g., log it or show an error message
          console.error("Error fetching booking:", error);
        }
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking)
    return (
      <div className="flex justify-center items-center my-52">
        <div className="flex justify-center items-center ">
          <ClockLoader size={200} color="#f5385d" />
        </div>
      </div>
    );

  return (
    <div className="my-4 sm:my-8">
      <h1 className="text-xl sm:text-3xl">{booking.place.title}</h1>
      <AddressLink className={"my-2 block"}>
        {booking.place.address}
      </AddressLink>
      <div className="bg-gray-300  p-2 sm:p-4  mb-2 sm:mb-4 rounded-2xl " >
        <h2 className="text-lg sm:text-3xl">
          Your Booking Information
          <BookingDate booking={booking}  />
        </h2>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
