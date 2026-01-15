"use client";

interface StarRatingProps {
  className?: string;
  size?: number;
}

export function StarRating({ className = "", size = 24 }: StarRatingProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Star shape */}
      <path
        d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
        fill="#d4a017"
        stroke="#d4a017"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Star shine highlight */}
      <path
        d="M12 4L13.5 8.5L12 7.5L10.5 8.5L12 4Z"
        fill="#fef3c7"
        opacity="0.6"
      />
    </svg>
  );
}

export default StarRating;
