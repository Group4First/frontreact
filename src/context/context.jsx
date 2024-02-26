import { createContext, useContext, useState } from "react";

// Se pone para tener autocompletado
const context = createContext() 

export function ContextProvider({children}) {

  // aqui declaro los useState que quiero que puedan ser accedidos desde cualquier sition de mi pagina
  // para usarlos uso --> const {ruta, resto de variables...} = useGlobalContext()
  const [alerts, setAlerts] = useState([])

  function activeAlert(type, message, time = 5000) {
    const newAlert = {type, message}
    setAlerts((prev) => ([...prev, newAlert])) 

    setTimeout(() => {
      setAlerts((prev) => (prev.slice(1)))
    }, time)
  }

  return (
    <context.Provider value={{ // aqui se le pasan los useState declarados
      alerts, activeAlert
    }}>
      {children}
    </context.Provider>
  )
}

export const useGlobalContext = () => {return useContext(context)}