import React from 'react';

export function Cards({ title, valor, className }) {
  return (
    <div className={`xl:w-[400px] rounded-lg shadow-lg  ${className}`}>
      <div className="px-6 py-8">
        <div className="font-sm text-sm mb-2">{title}</div>
        <p className="text-black-700 text-3xl">{valor}</p>
        <p></p>
      </div>      
    </div>   
  );
}


