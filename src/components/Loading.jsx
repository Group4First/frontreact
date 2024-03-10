import { Loader2 } from "lucide-react";

export function Loading ({size = 24 ,color = '#39A900'}) {
  return (
    <div className="animate-spin">
      <Loader2 color={color} size={size} strokeWidth={2.8}/>
    </div> 
  )
}