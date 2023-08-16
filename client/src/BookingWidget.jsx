import PropTypes from "prop-types";
import { useContext, useEffect, useState, useRef } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { UserContext } from "./UserContext";
import NotificationSound from "./assets/success.mp3";
import successGif from "./assets/animation_llba5v18_small.gif";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuest] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberofNights = 0;

  if (checkIn && checkOut) {
    numberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  function isValidInput() {
    
    return name && phone && checkIn && checkOut && user && numberofNights > 0;
  }
  function playAudio() {
    const audio = new Audio(NotificationSound);
    audio.loop = false;
    audio.play();
  }
  async function bookthisPlace() {
    if (!user) {
      setRedirect(`/login/`);
      return;
    }
    const bookingData = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberofNights * place.price,
      address: place.address,
    };
    console.log("storage:",localStorage.getItem("token"))
  
    try {
      const response = await axios.post("/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the JWT token in localStorage
        },
      });
  
      const bookingId = response.data._id;
  
      setShowSuccess(true);
      playAudio();
  
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
  
      setTimeout(() => {
        setRedirect(`/account/bookings/${bookingId}`);
      }, 3000);
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., display an error message)
    }
  }
  
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  if (showSuccess) {
    return (
      <div className="animate-pulse">
        <svg
          fill="#36ff33"
          height="256px"
          width="256px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-51.2 -51.2 614.40 614.40"
          xmlSpace="preserve"
          stroke="#36ff33"
          transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0">
            <path
              transform="translate(-51.2, -51.2), scale(19.2)"
              d="M16,29.591262949630618C20.531026213594913,29.62621019132838,25.79227451605486,29.59142258138702,28.371742082195297,25.866135084667334C30.862210618688486,22.26938069172347,29.159744566194355,17.34873925660956,27.177352234815466,13.448842291443212C25.742224481549414,10.625561409552748,22.31172947815609,10.169001965982913,19.578919586936276,8.568296901114994C16.247370991408037,6.616889037783783,13.52041004895839,1.9934774648119904,9.897086141209344,3.3271687907833574C6.232434328086571,4.676072300462515,6.764150146736428,9.889605611426433,5.746664480587004,13.659743076961243C4.635173299033026,17.7782035974388,1.5566520189368576,22.090005781492156,3.8652756422976484,25.677119756690743C6.285236661547522,29.437228552142685,11.528597523198172,29.55677557839981,16,29.591262949630618"
              fill="#ffffff"
              strokeWidth="0"
            ></path>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="3.072"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333 c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M399.083,207.083L249.749,356.416 c-4.011,4.011-9.429,6.251-15.083,6.251c-0.491,0-1.003-0.021-1.515-0.043c-6.165-0.448-11.84-3.541-15.552-8.491l-64-85.333 c-7.083-9.429-5.163-22.805,4.267-29.867c9.429-7.083,22.805-5.163,29.867,4.267l49.237,65.664l131.947-131.947 c8.341-8.341,21.824-8.341,30.165,0C407.424,185.259,407.424,198.741,399.083,207.083z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    );
  }
  return (
    <div className="bg-white shadow rounded-2xl p-4 text-[10px] sm:text-lg">
      <div className="text-2xl text-center font-serif">
        Price: Rs {place.price}/ per Night
      </div>
      <div className="border rounded-2xl mt-4 ">
        <div className="flex">
          <div className="px-4 py-4 ">
            <label className="font-bold">Check in:</label>
            <input
              type="date"
              className="bg-gray-300 px-2 border-solid border  rounded-l-lg"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              required
            />
          </div>
          <div className="px-3 py-4 border-l ">
            <label className="font-bold">Check Out:</label>
            <input
              className="bg-gray-300 px-2  border-solid border rounded-r-lg"
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
        Book this Place{" "}
        {numberofNights > 0 && (
          <span>for Rs {numberofNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
BookingWidget.propTypes = {
  place: PropTypes.shape({
    price: PropTypes.number.isRequired,
  }).isRequired,
};
