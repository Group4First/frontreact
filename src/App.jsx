import { createBrowserRouter, RouterProvider, useLocation} from 'react-router-dom'
import Login from './pages/login'
import { ContextProvider } from './context/context'
import { Sidebar } from './components/Sidebar'
import { Empresas } from './pages/Empresas'
import { useEffect, useState } from 'react'
import { Dasboard } from './pages/Dashboard'
import { Calculo_fic } from './pages/Calculo_fic'
import { Intereses } from './pages/Intereses'
import { Usuarios } from './pages/Usuarios'
import { PagosUsuario } from './pages/PagosUsuario'
import { RegistroEmpresa } from './pages/RegistroEmpresa'
import { Obras } from './pages/Obras'
import { RegistroIntereses } from './pages/RegistroIntereses'
import { RegistroUsuarios } from './pages/RegistroUsuarios'
import { Alert } from './components/Alert'
import { ContainerAlerts } from './components/ContainerAlerts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/dashboard',
    element: <MainContentWithSidebar> <Dasboard/> </MainContentWithSidebar>
  },
  {
    path: '/empresas',
    element: <MainContentWithSidebar> <Empresas/> </MainContentWithSidebar>
  },

  {
    path: '/empresas/registroempresas',
    element: <MainContentWithSidebar> <RegistroEmpresa/> </MainContentWithSidebar> 
  },

  {
    path: '/empresas/obras/:id',
    element: <MainContentWithSidebar> <Obras/> </MainContentWithSidebar>
  },

  {
    path: '/calculo-fic',
    element: <MainContentWithSidebar> <Calculo_fic/> </MainContentWithSidebar>
  },
  {
    path: '/intereses',
    element: <MainContentWithSidebar> <Intereses/> </MainContentWithSidebar>
  },
  {
    path: '/intereses/registrointereses',
    element: <MainContentWithSidebar> <RegistroIntereses/> </MainContentWithSidebar>
  },
  {
    path: '/usuarios',
    element: <MainContentWithSidebar> <Usuarios/> </MainContentWithSidebar>
  },
  {
    path: '/usuarios/RegistroUsuarios',
    element: <MainContentWithSidebar> <RegistroUsuarios/> </MainContentWithSidebar>
  },
  {
    path: '/usuarios/pagos/:id',
    element: <MainContentWithSidebar> <PagosUsuario/> </MainContentWithSidebar>
  }
  
])

export function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router}/>
      <ContainerAlerts/>
    </ContextProvider>
  )
}

function MainContentWithSidebar({children}) {

  const [isActive, setIsActive] = useState(false)

  return (
    <section className='w-full max-h-svh flex overflow-hidden lg:pl-[260px] transition-all duration-300'>
      <Sidebar isActive={isActive} setIsActive={setIsActive}/>

      <section onClick={() => {setIsActive(false)}} className='w-full max-h-svh relative overflow-hidden'>
        {children}
      </section>
    </section>
  )
}


