export function HdpeIcon({
  className = "h-[22px] w-[19px]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6 L4 26 L20 26 L18 6 Z"
        fill="#F4EDDD"
        stroke="#9C7526"
        strokeWidth="1.4"
      />
      <path
        d="M8 2 Q12 6 16 2"
        fill="none"
        stroke="#9C7526"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[10, 14, 18, 22].map((y) => (
        <line
          key={y}
          x1={5 - (y - 10) * 0.075}
          y1={y}
          x2={19 + (y - 10) * 0.075}
          y2={y}
          stroke="#9C7526"
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

export function LdPouchIcon({
  className = "h-[22px] w-[19px]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 5 Q6 3 8 3 L16 3 Q18 3 18 5 L19 24 Q19 26 17 26 L7 26 Q5 26 5 24 Z"
        fill="#F4EDDD"
        stroke="#4338CA"
        strokeWidth="1.4"
      />
      <circle
        cx="12"
        cy="5.5"
        r="1.1"
        fill="none"
        stroke="#4338CA"
        strokeWidth="0.9"
      />
      <path
        d="M6.5 10 Q12 8 17.5 10"
        fill="none"
        stroke="#4338CA"
        strokeWidth="0.8"
        opacity="0.55"
      />
    </svg>
  );
}
