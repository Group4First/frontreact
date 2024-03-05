import { X } from "lucide-react";

export function Modal({ open, onClose, title, text, onAcept }) {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors z-50
     ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    <X></X>
                </button>
                <div className="text-center w-80">
                    <div className="mx-auto my-4 w-48 flex flex-col gap-3">
                        <h3 className="text-gray-800 text-lg font-black">{title}</h3>
                        <p className="text-sm text-gray-500">{text}</p>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button className="btn bg-vgreen text-white w-full rounded-lg p-2 shadow-lg" onClick={() => { onAcept(); onClose(); }}>
                            Aceptar
                        </button>
                        <button className="btn bg-white text-gray-500  w-full rounded-lg p-2 shadow-lg " onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}