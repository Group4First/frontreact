export function CardPagos({ color, type, text }) {
    const cardStyle = {
      backgroundColor: `rgba(${parseInt(color.slice(-6, -4), 16)}, ${parseInt(color.slice(-4, -2), 16)}, ${parseInt(color.slice(-2), 16)}, 0.25)`,
    };
  
    const typeStyle = {
      color,
      marginLeft: '16px',
      opacity: 0.7,
      fontWeight: '600',
    };
    const textStyle = {
      color,
      marginLeft: '16px',
      fontWeight: '600',
    };
  
    return (
      <div className="w-40 rounded-lg py-2 max-lg:scale-75  " style={cardStyle}>
        <h3 style={typeStyle}>{type}</h3>
        <h3 style={textStyle} className="mt-1">{text}</h3>
      </div>
    );
  }