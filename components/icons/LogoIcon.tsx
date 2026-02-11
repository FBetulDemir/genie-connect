export default function LogoIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      {...props}>
      <circle cx="18" cy="18" r="18" fill="var(--accent-blue-500)" />
      <path
        d="M13 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM23 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM10 26v-3a4 4 0 0 1 4-4h1M26 26v-3a4 4 0 0 0-4-4h-1M16 21l2 2 2-2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
