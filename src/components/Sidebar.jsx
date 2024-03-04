import { AlignLeft, Building2, Calculator, ChevronRight, HandCoins, LayoutDashboard, LogOut, UsersRound } from "lucide-react";
import { NavButton } from "./NavButton";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function Sidebar({isActive, setIsActive}) {

  const navigate = useNavigate()
  const [idRol, setIdRol] = useState(JSON.parse(Cookies.get('session')).inforoles.idrol)

  function logout() {
    Cookies.remove('session')
    navigate('/')
  }

  return (
    <>
    <section className={`${!isActive && 'max-lg:-translate-x-[260px]'} transition-all duration-300 absolute left-0 z-10`}>
      <div className={`h-svh px-5 bg-[#F4F4F4] border-r-2 border-mygray flex flex-col items-center justify-between relative`}>
        <div className="w-full flex flex-col items-center">
          <img className="w-28 mt-5 mb-14" src="/logoSena.svg" alt=""></img>

          {idRol == 1 && <NavButton Icon={LayoutDashboard} text="Dashboard" url="/dashboard" />}
          <NavButton Icon={Building2} text="Empresas" url="/empresas" />
          <NavButton Icon={Calculator} text="Calculo Fic" url="/calculo-fic" />
          <NavButton Icon={HandCoins} text="Intereses" url="/intereses" />
          {idRol == 1 && <NavButton Icon={UsersRound} text="Usuarios" url="/usuarios" />}
        </div>

        <button onClick={logout} className="flex mb-10 px-5 py-2 hover:bg-red-400 transition-all duration-300 rounded-full">
          <LogOut />
          <h1 className="text-md font-semibold text-black ml-5"> Cerrar sesión </h1>
        </button>

        <button onClick={() => {setIsActive(!isActive)}} className={` ${isActive ? '-scale-x-100 rounded-s-xl border-l-2 border-r-0' : 'rounded-e-xl border-l-0 border-r-2'} bg-[#F4F4F4] border-t-2 border-b-2 py-4 absolute transition-all duration-300 -right-[25px]  top-1/2 transform -translate-y-1/2 lg:scale-0 z-50`}>
          <ChevronRight/>
        </button>
      </div>
    </section>
    </>
  )
}