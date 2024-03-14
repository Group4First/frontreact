import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function PaginationButtons({ totalPages, setCurrentPage, currentPage }) {
  const [active, setActive] = useState(currentPage + 1);

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

    if (totalPages <= 10) {
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
    } else {
      // Mostrar solo un subconjunto de páginas en el centro
      let start = Math.max(1, active - 1);
      let end = Math.min(totalPages, active + 1);

      if (active - 1 <= 2) {
        end = 4;
      }

      if (totalPages - active <= 2) {
        start = totalPages - 3;
      }

      for (let i = start; i <= end; i++) {
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

      if (active - 1 > 2) {
        buttons.unshift(
          <span key="startEllipsis" className="mx-1">
            ...
          </span>
        );
      }

      if (totalPages - active > 2) {
        buttons.push(
          <span key="endEllipsis" className="mx-1">
            ...
          </span>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex items-center gap-4 mb-10">
      <IconButton
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
        sx={{
          backgroundColor: active !== 1 ? "#fff" : "gray",
          color: "#4CAF50",
          borderRadius: "4px",
          width: "32px",
          height: "32px",
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
          borderRadius: "4px",
          width: "32px",
          height: "32px",
        }}
      >
        <ChevronRight strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
