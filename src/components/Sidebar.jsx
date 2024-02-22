import { Building2, Calculator, HandCoins, LayoutDashboard, LogOut, UsersRound } from "lucide-react";
import { NavButton } from "./NavButton";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function Sidebar() {

  const navigate = useNavigate()

  function logout() {
    Cookies.remove('session')
    navigate('/')
  }

  useEffect(() => {
    const data = JSON.parse(Cookies.get('session'))
    console.log(data);
  }, [])

  return (
    <section className="h-svh px-5 bg-[#F4F4F4] border-r-2 border-mygray flex flex-col items-center relative">
      <img className="w-28 mt-5 mb-14" src="/logoSena.svg" alt=""></img>

      <NavButton Icon={LayoutDashboard} text="Dashboard" url="/dashboard" />
      <NavButton Icon={Building2} text="Empresas" url="/empresas" />
      <NavButton Icon={Calculator} text="Calculo Fic" url="/calculo-fic" />
      <NavButton Icon={HandCoins} text="Intereses" url="/intereses" />
      <NavButton Icon={UsersRound} text="Usuarios" url="/usuarios" />

      <button onClick={logout} className="flex absolute bottom-10 px-5 py-2 hover:bg-red-400 transition-all duration-300 rounded-full">
        <LogOut />
        <h1 className="text-md font-semibold text-black ml-5"> Cerrar sesión </h1>
      </button>
    </section>
  )
}