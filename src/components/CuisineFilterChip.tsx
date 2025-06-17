import React from 'react';
import { Button } from "@/components/ui/button";
import clsx from 'clsx';

interface CuisineFilterChipProps {
  cuisineName: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string; // Allow passing additional custom classes
}

const CuisineFilterChip: React.FC<CuisineFilterChipProps> = ({
  cuisineName,
  isSelected,
  onClick,
  className,
}) => {
  console.log(`CuisineFilterChip loaded for: ${cuisineName}, selected: ${isSelected}`);

  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "default" : "secondary"} // "default" usually maps to primary styles for selected
      size="sm"
      className={clsx(
        "rounded-full px-4 py-1.5 h-auto text-sm font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected
          ? "bg-primary text-primary-foreground hover:bg-primary/90" // Explicitly define selected style
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Explicitly define unselected style
        className
      )}
      aria-pressed={isSelected}
      role="button" // Explicitly set role for clarity, though Button implies it
      tabIndex={0} // Ensure it's focusable
    >
      {cuisineName}
    </Button>
  );
};

export default CuisineFilterChip;