import { createBrowserRouter, RouterProvider, useLocation} from 'react-router-dom'
import Login from './pages/login'
import { ContextProvider } from './context/context'
import { Sidebar } from './components/Sidebar'
import { Empresas } from './pages/Empresas'
import { useEffect } from 'react'
import { Dasboard } from './pages/Dashboard'
import { Calculo_fic } from './pages/Calculo_fic'

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
    path: '/calculo-fic',
    element: <MainContentWithSidebar> <Calculo_fic/> </MainContentWithSidebar>
  }
])

export function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  )
}

function MainContentWithSidebar({children}) {
  return (
    <section className='w-full max-h-svh flex overflow-hidden'>
      <Sidebar/>
      <section className='w-full max-h-svh relative overflow-hidden'>
        {children}
      </section>
    </section>
  )
}


