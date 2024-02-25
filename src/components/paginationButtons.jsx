import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function PaginationButtons({ totalPages, setCurrentPage }) {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      setCurrentPage(index - 1);
    },
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
    setCurrentPage(active);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    setCurrentPage(active - 2);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <IconButton
          key={i}
          {...getItemProps(i)}
          sx={{
            backgroundColor: active === i ? "#4CAF50" : "#fff",
            color: active === i ? "#fff" : "#000",
            ":hover": {
              backgroundColor: "#4CAF50",
              color: "#fff",
            },
            width: "32px",
            height: "32px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {i}
        </IconButton>
      );
    }
    return buttons;
  };

  return (
    <div className="flex items-center gap-4">
      <IconButton
        onClick={prev}
        disabled={active === 1}
        sx={{
          backgroundColor: active !== 1 ? "#fff" : "gray",
          color: "#4CAF50",
          borderRadius: "4px", // Cuadrado
          width: "32px", // Ajusta el ancho según tus necesidades
          height: "32px", // Ajusta la altura según tus necesidades
        }}
      >
        <ChevronLeft strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <div className="flex items-center gap-2">{renderPageButtons()}</div>
      <IconButton
        onClick={next}
        disabled={active === totalPages}
        sx={{
          backgroundColor: active !== totalPages ? "#fff" : "gray",
          color: "#4CAF50",
          borderRadius: "4px", // Cuadrado
          width: "32px", // Ajusta el ancho según tus necesidades
          height: "32px", // Ajusta la altura según tus necesidades
        }}
      >
        <ChevronRight strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
