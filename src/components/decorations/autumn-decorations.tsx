export function AutumnBranch({
  className = "w-40 h-40",
  flipped = false,
  color = "#D97A43"
}: {
  className?: string;
  flipped?: boolean;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flipped ? "-scale-x-100" : ""} pointer-events-none select-none transition-opacity`}
      aria-hidden="true"
    >
      {/* Central stem */}
      <path
        d="M20 190C45 150 75 100 135 20"
        stroke="#8C5332"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Lower branch & leaves */}
      <path
        d="M50 145C30 135 20 115 15 95C28 100 45 110 52 140"
        fill="#C85A32"
        opacity="0.85"
      />
      <path
        d="M62 130C80 120 95 105 100 85C90 95 75 108 64 125"
        fill="#E08B3E"
        opacity="0.85"
      />
      {/* Mid leaves */}
      <path
        d="M80 100C65 85 55 65 52 45C65 52 80 65 82 95"
        fill="#D97736"
        opacity="0.9"
      />
      <path
        d="M98 75C118 65 132 50 138 30C125 42 110 55 100 70"
        fill="#E29A4A"
        opacity="0.9"
      />
      {/* Top leaves */}
      <path
        d="M120 42C122 22 135 10 145 5C142 18 135 30 122 38"
        fill="#C85A32"
      />
      {/* Subtle small dots / berries */}
      <circle cx="28" cy="165" r="3" fill="#E29A4A" opacity="0.6" />
      <circle cx="36" cy="172" r="2.5" fill="#C85A32" opacity="0.6" />
      <circle cx="24" cy="176" r="2" fill="#8C5332" opacity="0.4" />
    </svg>
  );
}

export function KintsugiVase({
  className = "w-48 h-64",
  opacity = 0.25
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none select-none`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Ceramic Vase Outline / Body */}
      <path
        d="M70 20 C85 20, 115 20, 130 20 C135 35, 125 50, 120 65 C145 95, 165 140, 160 190 C155 240, 135 260, 100 260 C65 260, 45 240, 40 190 C35 140, 55 95, 80 65 C75 50, 65 35, 70 20 Z"
        fill="#EADBC9"
        stroke="#8C6D58"
        strokeWidth="2"
      />
      {/* Neck rim */}
      <ellipse cx="100" cy="20" rx="30" ry="6" stroke="#8C6D58" strokeWidth="2" fill="#DFCEBA" />
      
      {/* Kintsugi Gold Seams / Repair Lines */}
      <path
        d="M100 26 C90 55, 115 80, 85 115 C70 135, 95 165, 75 200 C65 220, 80 245, 95 260"
        stroke="#D4AF37"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M85 115 C110 125, 135 110, 150 130"
        stroke="#D4AF37"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M75 200 C90 195, 110 205, 125 195 C140 185, 155 190, 160 195"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Gold Powder Accent Splatters */}
      <circle cx="86" cy="114" r="2.5" fill="#F3DE8A" />
      <circle cx="76" cy="198" r="2.5" fill="#F3DE8A" />
      <circle cx="102" cy="78" r="1.5" fill="#F3DE8A" />
    </svg>
  );
}
