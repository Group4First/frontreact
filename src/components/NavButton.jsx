import { useLocation, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/context"

export function NavButton({ url, text, Icon }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <button onClick={() => { navigate(url) }} className={`flex gap-5 w-[220px] items-center ${location.pathname.includes(url) ? 'bg-vgray text-vgreen' : 'hover:bg-vgray'} mb-7 px-10 py-2 transition-all duration-300 rounded-full cursor-pointer`}>
      <Icon />
      <h1 className="text-md font-semibold text-[#393939]"> {text} </h1>
    </button>

  )

}