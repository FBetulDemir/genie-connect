export default function EyeOffIcon({
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
        d="M6.58667 6.58667C6.39418 6.76597 6.24034 6.98262 6.13459 7.22307C6.02884 7.46351 5.97335 7.72274 5.97127 7.98533C5.96919 8.24792 6.02057 8.50799 6.12251 8.75004C6.22444 8.99208 6.37486 9.21107 6.56439 9.39561C6.75392 9.58014 6.97691 9.72457 7.22189 9.82039C7.46687 9.91621 7.72874 9.96139 7.99134 9.95312C8.25393 9.94486 8.51138 9.88325 8.74832 9.77194C8.98525 9.66063 9.19779 9.50191 9.37267 9.30533"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.15333 3.38C7.43111 3.34889 7.71333 3.33333 8 3.33333C12 3.33333 14.6667 8 14.6667 8C14.3787 8.52222 14.0353 9.01333 13.6413 9.464"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.40667 4.40667C3.18267 5.21133 2.20267 6.388 1.33333 8C1.33333 8 4 12.6667 8 12.6667C9.15733 12.6667 10.218 12.2733 11.1427 11.6413"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.33333 1.33333L14.6667 14.6667"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
