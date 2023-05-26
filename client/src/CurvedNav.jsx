

export default function CurvedNav() {
  return (
    <div className="flex gap-2  border rounded-full py-2 px-4 shadow-lg shadow-gray-300 border-gray-300 cursor-pointer">
    <div>Anywhere</div>
    <div className=" border-l border-gray-300"></div>
    <div>Any Week</div>
    <div className=" border-l border-gray-300"></div>
    <div>Add Guest</div>
    <button className="bg-primary text-white p-1 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
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
