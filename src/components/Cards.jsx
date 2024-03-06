import React from 'react';

export function Cards({ title, valor, className }) {
  return (
    <div className={`${className}`}>
        <div>{title}</div>
        <p>{valor}</p>
    </div>
  );
}


