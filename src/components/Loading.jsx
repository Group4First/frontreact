import { Loader2 } from "lucide-react";

export function Loading ({size = 24}) {
  return (
    <div className="animate-spin">
      <Loader2 color="#38A900" size={size} strokeWidth={2.8}/>
    </div> 
  )
}