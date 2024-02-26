import { AlertCircle, AlertTriangle, Info, Check } from "lucide-react"

export function Alert ({type = 'error', message}) {

  const types = {
    warning: "bg-yellow-200 border-yellow-500 text-yellow-800",
    info: "bg-blue-200 border-blue-400 text-blue-600",
    success: "bg-green-200 border-green-400 text-green-800",
    error: "bg-red-200 border-red-300 text-red-600"
  }

  const messagesTypes = {
    warning: "Alerta!",
    info: "Informacion",
    success: "Completado",
    error: "Error"
  }

  const icons = {
    warning: <AlertTriangle/>,
    info: <Info/>,
    success: <Check/>,
    error: <AlertCircle/>
  }

  return (
    <section className={`max-md:w-[300px] md:w-[450px] min-h-20 bg-opacity-80 rounded-lg border-b-4 p-4 flex ${types[type]}`}>
      <div className="mr-3 mt-[3px]">
        {icons[type]}
      </div>
      <div>
        <h1 className="font-bold text-lg"> {messagesTypes[type]} </h1>
        <p className="font-medium opacity-80">
          {message}
        </p>
      </div>
    </section>
  )
}