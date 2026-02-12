export default function FlagIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}>
      <path
        d="M2.66667 10C2.66667 10 3.33334 9.33333 5.33334 9.33333C7.33334 9.33333 8.66667 10.6667 10.6667 10.6667C12.6667 10.6667 13.3333 10 13.3333 10V2C13.3333 2 12.6667 2.66667 10.6667 2.66667C8.66667 2.66667 7.33334 1.33333 5.33334 1.33333C3.33334 1.33333 2.66667 2 2.66667 2V10Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66667 14.6667V10"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
