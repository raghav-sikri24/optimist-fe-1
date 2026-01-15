"use client";

interface IseerBadgeProps {
  className?: string;
  size?: number;
}

export function IseerBadge({ className = "", size = 40 }: IseerBadgeProps) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Badge background - curved ribbon shape */}
      <path
        d="M2 15C2 8 6 4 12 4H28C34 4 38 8 38 15C38 22 34 26 28 26H12C6 26 2 22 2 15Z"
        fill="#dc2626"
      />
      {/* Badge shine/highlight */}
      <path
        d="M6 12C6 9 8 6 12 6H28C32 6 34 9 34 12"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Stars */}
      <circle cx="12" cy="15" r="2" fill="#fbbf24" />
      <circle cx="20" cy="15" r="2" fill="#fbbf24" />
      <circle cx="28" cy="15" r="2" fill="#fbbf24" />
      {/* Star shine */}
      <circle cx="12" cy="14" r="0.5" fill="#fef3c7" />
      <circle cx="20" cy="14" r="0.5" fill="#fef3c7" />
      <circle cx="28" cy="14" r="0.5" fill="#fef3c7" />
    </svg>
  );
}

export default IseerBadge;
