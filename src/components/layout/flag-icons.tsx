import { cn } from "@/lib/utils";

type CountryCode = "BR" | "US" | "ES";

const flagPaths: Record<CountryCode, React.ReactElement> = {
  BR: (
    <>
      <rect width="36" height="24" fill="#009C3B" />
      <polygon points="18,3 33,12 18,21 3,12" fill="#FFDF00" />
      <circle cx="18" cy="12" r="5" fill="#002776" />
      <path
        d="M13.5 13.2c2.7 -1.3 6.2 -1.3 9 0"
        fill="none"
        stroke="#fff"
        strokeWidth="0.8"
      />
    </>
  ),
  US: (
    <>
      <rect width="36" height="24" fill="#fff" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          y={i * (24 / 13) * 2}
          width="36"
          height={24 / 13}
          fill="#B22234"
        />
      ))}
      <rect width="14.4" height={(24 / 13) * 7} fill="#3C3B6E" />
    </>
  ),
  ES: (
    <>
      <rect width="36" height="24" fill="#AA151B" />
      <rect y="6" width="36" height="12" fill="#F1BF00" />
    </>
  ),
};

interface FlagIconProps {
  country: CountryCode;
  className?: string;
}

export function FlagIcon({ country, className }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 36 24"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      {flagPaths[country]}
    </svg>
  );
}
