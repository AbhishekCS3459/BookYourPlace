// import {useState} from 'react'
import PropTypes from "prop-types";
// export default function PlaceGallery({place}) {
//     const [showAllPhotos, setShowAllPhotos] = useState(false)

//     if (showAllPhotos)
//     return (
//       <div className="absolute inset-0 bg-black text-white min-h-screen">
//         <div className="p-8 grid gap-4 bg-black">
//           <div>
//             <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
//             <button
//               onClick={() => setShowAllPhotos(false)}
//               className="flex top-8 right-12 gap-1 px-4 bg-white text-black py-2 rounded-2xl  fixed shadow shadow-black"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//               Close Photos
//             </button>
//           </div>
//           {place?.photos?.length > 0 &&
//             place.photos.map((photo) => (
//               <div key={photo.length}>
//                 <img
//                   className="aspect-square object-cover rounded-xl"
//                   src={'https://bookyourplace.onrender.com/uploads/' + photo}
//                   alt=""
//                 />
//               </div>
//             ))}
//         </div>
//       </div>
//     )

//   return (

//     <div className="relative">
//       <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
//         <div>
//           {place.photos?.[0] && (
//             <div>
//               <img
//                 onClick={() => setShowAllPhotos(true)}
//                 className="aspect-square cursor-pointer object-cover "
//                 src={'https://bookyourplace.onrender.com/uploads/' + place.photos[0]}
//                 alt=""
//               />
//             </div>
//           )}
//         </div>
//         <div className="grid">
//           {place.photos?.[1] && (
//             <img
//               onClick={() => setShowAllPhotos(true)}
//               className="aspect-square cursor-pointer object-cover "
//               src={'https://bookyourplace.onrender.com/uploads/' + place.photos[1]}
//               alt=""
//             />
//           )}
//           <div className="overflow-hidden">
//             {place.photos?.[2] && (
//               <img
//                 onClick={() => setShowAllPhotos(true)}
//                 className="aspect-square cursor-pointer object-cover relative top-2 "
//                 src={'https://bookyourplace.onrender.com/uploads/' + place.photos[2]}
//                 alt=""
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       <button
//         className="absolute  flex gap-1 bottom-2 shadow-md shadow-gray-500 right-2 py-2 px-4
//      bg-white rounded-2xl"
//         onClick={() => setShowAllPhotos(!showAllPhotos)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
//           />
//         </svg>
//         Show More Photos
//       </button>
//     </div>
//   )
// }

import { useState } from "react";
import Image from "./Image.jsx";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white max-h-screen font-serif">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-4 sm:right-8 top-8 flex items-center gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-sm sm:text-lg ">Close Photos</h1>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo._id}>
                <Image src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover"
              src={place.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover relative top-2"
                src={place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 items-center right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-sm sm:text-lg">Show more photos</h1>
      </button>
    </div>
  );
}
PlaceGallery.propTypes = {
  place: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    // Add other prop types for the 'place' object if needed
  }).isRequired,
};
