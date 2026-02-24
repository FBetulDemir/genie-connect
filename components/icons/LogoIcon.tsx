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
      {/* Blue circle background */}
      <circle cx="18" cy="18" r="18" fill="var(--accent-blue-500)" />
      {/* Letter A — the Agora mark */}
      <path
        d="M18 8L12 26M18 8L24 26"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20L22 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Arc at the base — representing the forum/gathering place */}
      <path
        d="M10 29Q18 25 26 29"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
