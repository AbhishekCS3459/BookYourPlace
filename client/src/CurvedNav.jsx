

export default function CurvedNav() {
  return (
    <div className="flex gap-2  border rounded-full py-2 px-2 sm:py-2 sm:px-4   shadow-lg shadow-gray-300 border-gray-300 cursor-pointer text-[7px] sm:text-lg  text-center h-8 sm:h-auto "  >
    <div className="my-0.5 sm:my-0 ">Anywhere</div>
    <div className=" border-l border-gray-300  h-4 sm:h-auto "></div>
    <div className="my-0.5 sm:my-0">Any Week</div>
    <div className=" border-l border-gray-300  h-4 sm:h-auto "></div>
    <div className="my-0.5 sm:my-0">Add Guest</div>
    <button className="bg-primary text-white p-1  rounded-full sm:rounded-2xl sm:p-2  flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-2 sm:w-4 sm:h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </div>
  )
}
