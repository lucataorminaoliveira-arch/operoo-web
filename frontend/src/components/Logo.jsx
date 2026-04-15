import { cn } from '@/lib/utils';

export function Logo({ className, size = 'md' }) {
  const sizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  };

  return (
    <svg
      viewBox="0 0 200 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizes[size], 'w-auto', className)}
      data-testid="operoo-logo"
    >
      {/* Green O with checkmark */}
      <ellipse cx="18" cy="21" rx="16" ry="18" fill="#7CB342" />
      <ellipse cx="18" cy="21" rx="10" ry="12" fill="white" />
      <path
        d="M10 21 L16 28 L28 13"
        stroke="#7CB342"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* PEROO text */}
      <text
        x="38"
        y="30"
        fontFamily="'Manrope', sans-serif"
        fontWeight="800"
        fontSize="30"
        fill="#1a1a1a"
        letterSpacing="-0.5"
      >
        OPEROO
      </text>
    </svg>
  );
}
