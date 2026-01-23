import { memo } from "react";

// =============================================================================
// Icon Props
// =============================================================================

interface IconProps {
  className?: string;
}

// =============================================================================
// Arrow Icons (for gallery navigation)
// =============================================================================

export const ArrowRightIcon = memo(function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Package Icon (for delivery info)
// =============================================================================

export const PackageIcon = memo(function PackageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.75 8.125L6.25 4.0625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 13.3333V6.66667C17.4997 6.42448 17.435 6.18679 17.3124 5.97762C17.1898 5.76845 17.0139 5.59519 16.8021 5.47583L10.5521 1.8925C10.3857 1.79741 10.1958 1.74731 10.0026 1.74731C9.80936 1.74731 9.61942 1.79741 9.45312 1.8925L3.20312 5.47583C2.99129 5.59519 2.8154 5.76845 2.6928 5.97762C2.5702 6.18679 2.50545 6.42448 2.50521 6.66667V13.3333C2.50545 13.5755 2.5702 13.8132 2.6928 14.0224C2.8154 14.2316 2.99129 14.4048 3.20312 14.5242L9.45312 18.1075C9.61942 18.2026 9.80936 18.2527 10.0026 18.2527C10.1958 18.2527 10.3857 18.2026 10.5521 18.1075L16.8021 14.5242C17.0139 14.4048 17.1898 14.2316 17.3124 14.0224C17.435 13.8132 17.4997 13.5755 17.5 13.3333Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.69531 5.95L10.0036 10.0083L17.312 5.95" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18.3333V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Shopping Bag Icon (for Add to Cart button)
// =============================================================================

export const ShoppingBagIcon = memo(function ShoppingBagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Trophy Icon (for Details section)
// =============================================================================

export const TrophyIcon = memo(function TrophyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 17.5H13.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14.375V17.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.75 2.5H6.25V8.75C6.25 9.74456 6.64509 10.6984 7.34835 11.4016C8.05161 12.1049 9.00544 12.5 10 12.5C10.9946 12.5 11.9484 12.1049 12.6517 11.4016C13.3549 10.6984 13.75 9.74456 13.75 8.75V2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.25 5H3.125C2.95924 5 2.80027 5.06585 2.68306 5.18306C2.56585 5.30027 2.5 5.45924 2.5 5.625V6.25C2.5 7.24456 2.89509 8.19839 3.59835 8.90165C4.30161 9.60491 5.25544 10 6.25 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.75 5H16.875C17.0408 5 17.1997 5.06585 17.3169 5.18306C17.4342 5.30027 17.5 5.45924 17.5 5.625V6.25C17.5 7.24456 17.1049 8.19839 16.4017 8.90165C15.6984 9.60491 14.7446 10 13.75 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Shield Check Icon (for Details section - Warranty)
// =============================================================================

export const ShieldCheckIcon = memo(function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18.3333C10 18.3333 16.6667 15 16.6667 10V4.16667L10 1.66667L3.33333 4.16667V10C3.33333 15 10 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Wrench Icon (for Details section - Installation)
// =============================================================================

export const WrenchIcon = memo(function WrenchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0833 4.58333C12.9946 4.58316 13.8812 4.87686 14.6125 5.42044C15.3439 5.96402 15.8804 6.72806 16.1431 7.5988C16.4058 8.46954 16.3806 9.40099 16.0714 10.2567C15.7621 11.1124 15.1851 11.8472 14.425 12.35L12.5 17.5H7.5L5.575 12.35C4.81489 11.8472 4.23788 11.1124 3.92865 10.2567C3.61941 9.40099 3.59421 8.46954 3.85691 7.5988C4.11961 6.72806 4.6561 5.96402 5.38746 5.42044C6.11882 4.87686 7.00538 4.58316 7.91667 4.58333H12.0833Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 17.5V15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 17.5V15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12.5V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33333 10C8.79357 10 9.16667 9.6269 9.16667 9.16667C9.16667 8.70643 8.79357 8.33333 8.33333 8.33333C7.8731 8.33333 7.5 8.70643 7.5 9.16667C7.5 9.6269 7.8731 10 8.33333 10Z" fill="currentColor"/>
      <path d="M11.6667 10C12.1269 10 12.5 9.6269 12.5 9.16667C12.5 8.70643 12.1269 8.33333 11.6667 8.33333C11.2064 8.33333 10.8333 8.70643 10.8333 9.16667C10.8333 9.6269 11.2064 10 11.6667 10Z" fill="currentColor"/>
    </svg>
  );
});

// =============================================================================
// Radio Button Icons (for variant selection)
// =============================================================================

export const RadioFilledIcon = memo(function RadioFilledIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="#3478F6" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="4" fill="#3478F6"/>
    </svg>
  );
});

export const RadioEmptyIcon = memo(function RadioEmptyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
    </svg>
  );
});

// =============================================================================
// Status Icons
// =============================================================================

export const CheckCircleIcon = memo(function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#22C55E" />
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const XCircleIcon = memo(function XCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FFFCDC" />
      <path d="M15 9L9 15M9 9L15 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Product Detail Icons
// =============================================================================

export const DiamondIcon = memo(function DiamondIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 9L12 22L22 9L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2L8 9L12 22L16 9L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const WarrantyIcon = memo(function WarrantyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const InstallationIcon = memo(function InstallationIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3C14.5 6.1 14.2 6 14 6H10C9.4 6 9 6.4 9 7V11C9 11.6 9.4 12 10 12H14C14.6 12 15 11.6 15 11V7C15 6.8 14.9 6.5 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const DeliveryIcon = memo(function DeliveryIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const CartIcon = memo(function CartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// Result Section Icons
// =============================================================================

export const SnowflakeIcon = memo(function SnowflakeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.34 7L20.66 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.34 7L4.34 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.34 7L7.34 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.66 17L19.66 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.66 17L16.66 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.66 7L3.34 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.66 7L16.66 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.66 7L19.66 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.34 17L7.34 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.34 17L4.34 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const PiggyBankIcon = memo(function PiggyBankIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V13C22 13.5304 21.7893 14.0391 21.4142 14.4142C21.0391 14.7893 20.5304 15 20 15H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 18V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H8C8.26522 21 8.51957 20.8946 8.70711 20.7071C8.89464 20.5196 9 20.2652 9 20V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 18V20C15 20.2652 15.1054 20.5196 15.2929 20.7071C15.4804 20.8946 15.7348 21 16 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12C3 10.4087 3.63214 8.88258 4.75736 7.75736C5.88258 6.63214 7.4087 6 9 6H15C16.5913 6 18.1174 6.63214 19.2426 7.75736C20.3679 8.88258 21 10.4087 21 12C21 13.5913 20.3679 15.1174 19.2426 16.2426C18.1174 17.3679 16.5913 18 15 18H9C7.4087 18 5.88258 17.3679 4.75736 16.2426C3.63214 15.1174 3 13.5913 3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const PersonWalkIcon = memo(function PersonWalkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 21L10 14L8 13V9L11 7H15L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14L14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 13L19 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// =============================================================================
// After Buy Section Icons
// =============================================================================

export const OrderConfirmIcon = memo(function OrderConfirmIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#3478F6" strokeWidth="2"/>
      <path d="M13 20L18 25L27 15" stroke="#3478F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const UserCircleCheckIcon = memo(function UserCircleCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="6" stroke="#3478F6" strokeWidth="2"/>
      <path d="M8 34C8 27.373 13.373 22 20 22C26.627 22 32 27.373 32 34" stroke="#3478F6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="6" fill="white" stroke="#3478F6" strokeWidth="2"/>
      <path d="M29 32L31 34L35 30" stroke="#3478F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

export const ScrollDocIcon = memo(function ScrollDocIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="24" height="28" rx="2" stroke="#3478F6" strokeWidth="2"/>
      <path d="M14 14H26" stroke="#3478F6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 20H26" stroke="#3478F6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 26H20" stroke="#3478F6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
});

export const ToolboxIcon = memo(function ToolboxIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="32" height="20" rx="2" stroke="#3478F6" strokeWidth="2"/>
      <path d="M14 14V10C14 8.89543 14.8954 8 16 8H24C25.1046 8 26 8.89543 26 10V14" stroke="#3478F6" strokeWidth="2"/>
      <path d="M4 22H36" stroke="#3478F6" strokeWidth="2"/>
      <rect x="17" y="20" width="6" height="4" rx="1" fill="#3478F6"/>
    </svg>
  );
});
