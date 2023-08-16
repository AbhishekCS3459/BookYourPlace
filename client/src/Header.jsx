// import React from 'react'
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import CurvedNav from "./CurvedNav";
export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between gap-4 sm:gap-0 ">
      <Link to={"/"} className="flex items-center gap-1 -m-4 sm:-ml-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 sm:w-8 sm:h-8 -rotate-90 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold  text-xs  sm:text-xl">HotelWala</span>
      </Link>
      <div className=" ml-[1em] sm:ml-[0em] ">
        <CurvedNav />
      </div>

      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2  border  rounded-full px-2 sm:py-2 sm:px-4  border-gray-300 -mr-6 sm:-mr-0"
      >
        {/* {!user && ( */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" w-3 h-3 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        {/* )} */}
        <div className="bg-gray-500 text-white rounded-full border  overflow-hidden border-solid border-green-800 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="flex-shrink w-4 h-4 sm:w-6 sm:h-6 relative top-1  "
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* {!!user && <div className="text-sm sm:text-lg">{user.name}</div>} */}
      </Link>
    </header>
  );
}
