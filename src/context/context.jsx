import { createContext, useContext, useState } from "react";

// Se pone para tener autocompletado
const context = createContext() 

export function ContextProvider({children}) {

  // aqui declaro los useState que quiero que puedan ser accedidos desde cualquier sition de mi pagina
  // para usarlos uso --> const {ruta, resto de variables...} = useGlobalContext()
  const [ruta, setRuta] = useState()
  const [token, setToken] = useState()

  return (
    <context.Provider value={{
      // aqui se le pasan los useState declarados
      ruta, setRuta,
      token, setToken
    }}>
      {children}
    </context.Provider>
  )
}

export const useGlobalContext = () => {return useContext(context)}