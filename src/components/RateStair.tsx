function RateStair({ rating = 0 }) {
  const maxStars = 5;

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 ms-1 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}

      {/* Media estrella (si aplica) */}
      {hasHalf && (
        <svg
          key="half"
          className="w-4 h-4 ms-1 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="url(#half-star-gradient)"
          viewBox="0 0 22 20"
        >
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
              {/* Gris claro standard de Tailwind (bg-gray-300) */}
            </linearGradient>
          </defs>
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      )}

      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 ms-1 text-primary"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
}

export default RateStair;
