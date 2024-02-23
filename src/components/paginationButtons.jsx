import { Button, IconButton } from "@mui/material";
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
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
        sx={{
          color: "#4CAF50", // Cambia el color del texto según tus necesidades
        }}
      >
        <ChevronLeft strokeWidth={2} className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2">{renderPageButtons()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
        sx={{
          color: "#4CAF50", // Cambia el color del texto según tus necesidades
        }}
      >
        Siguiente <ChevronRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
