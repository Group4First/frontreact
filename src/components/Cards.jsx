import React from 'react';

export function Cards({ title, valor, className }) {
  return (
    <div className={`w-full min-w-[300px] rounded-xl  ${className}`}>
      <div className="px-6 py-8">
        <div className=" font-sm text-sm mb-2 text-wrap">{title}</div>
        <p className="text-black-700 text-3xl font-medium">{valor}</p>
        <p></p>
      </div>      
    </div>   
  );
}


