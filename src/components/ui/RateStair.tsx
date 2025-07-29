import React from "react";

interface RateStairProps {
  rating?: number;
  select?: boolean;
  onChange?: (rating: number) => void;
}

const RateStair: React.FC<RateStairProps> = ({
  rating = 0,
  select = false,
  onChange,
}) => {
  const maxStars = 5;

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  // Handle star click when select is enabled
  const handleStarClick = (starValue: number): void => {
    if (!select || !onChange) return;
    onChange(starValue);
  };

  // Generate array of star values for easier handling
  const starValues: number[] = Array.from(
    { length: maxStars },
    (_, i) => i + 1,
  );

  return (
    <div className="flex items-center">
      {starValues.map((starValue) => {
        const isHalf = starValue === fullStars + 1 && hasHalf;
        const isEmpty = starValue > fullStars + (hasHalf ? 1 : 0);

        return (
          <svg
            key={`star-${starValue}`}
            className={`ms-1 h-4 w-4 ${
              isEmpty ? "text-primary" : "text-yellow-300"
            } ${select ? "cursor-pointer hover:opacity-80" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill={isHalf ? "url(#half-star-gradient)" : "currentColor"}
            viewBox="0 0 22 20"
            onClick={() => handleStarClick(starValue)}
          >
            {isHalf && (
              <defs>
                <linearGradient
                  id="half-star-gradient"
                  x1="0"
                  x2="100%"
                  y1="0"
                  y2="0"
                >
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#323232" />
                </linearGradient>
              </defs>
            )}
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      })}
    </div>
  );
};

export default RateStair;
