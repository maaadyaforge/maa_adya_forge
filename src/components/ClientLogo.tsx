export type ClientLogoId = 'lt' | 'ntpc' | 'nrl' | 'bhel';

interface ClientLogoProps {
  id: ClientLogoId;
  name: string;
}

export function ClientLogo({ id, name }: ClientLogoProps) {
  if (id === 'lt') {
    return (
      <div
        data-testid="client-logo-lt"
        className="h-14 w-full flex items-center justify-center mb-3"
      >
        <svg
          viewBox="0 0 248 64"
          className="h-12 w-auto max-w-full"
          role="img"
          aria-label={`${name} logo`}
        >
          {/* Iconic circular L&T emblem */}
          <circle cx="32" cy="32" r="25" fill="#004B87" />
          <circle
            cx="32"
            cy="32"
            r="21"
            fill="#FFCC00"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <circle cx="32" cy="32" r="17.5" fill="#004B87" />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="900"
            fontSize="16"
            letterSpacing="-0.5"
          >
            L&amp;T
          </text>
          {/* Wordmark */}
          <text
            x="66"
            y="30"
            fill="#004B87"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="800"
            fontSize="15.5"
            letterSpacing="0.3"
          >
            LARSEN &amp; TOUBRO
          </text>
          <rect x="66" y="36" width="166" height="2.5" rx="1.25" fill="#FFCC00" />
          <text
            x="66"
            y="49"
            fill="#475569"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="600"
            fontSize="8.4"
            letterSpacing="0.85"
          >
            ENGINEERING &amp; CONSTRUCTION
          </text>
        </svg>
      </div>
    );
  }

  if (id === 'ntpc') {
    return (
      <div
        data-testid="client-logo-ntpc"
        className="h-14 w-full flex items-center justify-center mb-3"
      >
        <svg
          viewBox="0 0 180 64"
          className="h-12 w-auto max-w-full"
          role="img"
          aria-label={`${name} logo`}
        >
          {/* Classic NTPC sweeping upper crimson arc and lower royal blue arc */}
          <path
            d="M26 24 C48 6, 132 6, 154 22"
            fill="none"
            stroke="#E31E24"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M34 45 C62 58, 122 57, 154 41"
            fill="none"
            stroke="#00529B"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          {/* Bold italicized NTPC mark */}
          <text
            x="90"
            y="40"
            textAnchor="middle"
            fill="#00529B"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="27"
            letterSpacing="2"
          >
            NTPC
          </text>
          <text
            x="90"
            y="60"
            textAnchor="middle"
            fill="#475569"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="700"
            fontSize="7.5"
            letterSpacing="1"
          >
            A MAHARATNA COMPANY
          </text>
        </svg>
      </div>
    );
  }

  if (id === 'nrl') {
    return (
      <div
        data-testid="client-logo-nrl"
        className="h-14 w-full flex items-center justify-center mb-3"
      >
        <svg
          viewBox="0 0 208 64"
          className="h-12 w-auto max-w-full"
          role="img"
          aria-label={`${name} logo`}
        >
          {/* Refinery oil-drop & eco-flame emblem */}
          <g transform="translate(14, 7)">
            <path
              d="M24 3 C34 15, 42 25, 42 34 C42 43.5, 34 50, 24 50 C14 50, 6 43.5, 6 34 C6 25, 14 15, 24 3 Z"
              fill="#0054A6"
            />
            <path
              d="M24 12 C31 21, 36 28, 36 34.5 C36 41, 30.8 45.5, 24 45.5 C17.2 45.5, 12 41, 12 34.5 C12 28, 17 21, 24 12 Z"
              fill="#008C45"
            />
            <path
              d="M24 21 C28.5 27, 31 31.5, 31 35.5 C31 39.5, 27.9 42.5, 24 42.5 C20.1 42.5, 17 39.5, 17 35.5 C17 31.5, 19.5 27, 24 21 Z"
              fill="#F58220"
            />
          </g>
          {/* NRL Wordmark */}
          <text
            x="70"
            y="34"
            fill="#0054A6"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="2.5"
          >
            NRL
          </text>
          <rect x="70" y="39" width="72" height="2.5" rx="1.25" fill="#008C45" />
          <rect x="144" y="39" width="44" height="2.5" rx="1.25" fill="#F58220" />
          <text
            x="70"
            y="52"
            fill="#475569"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="700"
            fontSize="7.6"
            letterSpacing="0.8"
          >
            NUMALIGARH REFINERY
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      data-testid="client-logo-bhel"
      className="h-14 w-full flex items-center justify-center mb-3"
    >
      <svg
        viewBox="0 0 185 64"
        className="h-12 w-auto max-w-full"
        role="img"
        aria-label={`${name} logo`}
      >
        {/* Signature BHEL cobalt blue geometric emblem */}
        <rect
          x="16"
          y="9"
          width="153"
          height="46"
          rx="10"
          fill="#0060AA"
        />
        <rect
          x="21"
          y="14"
          width="143"
          height="36"
          rx="6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
        {/* Dynamic turbine / industrial speed bars */}
        <rect x="27" y="21" width="12" height="3.5" rx="1.5" fill="#38BDF8" />
        <rect x="27" y="29" width="16" height="3.5" rx="1.5" fill="#FFFFFF" />
        <rect x="27" y="37" width="12" height="3.5" rx="1.5" fill="#38BDF8" />
        {/* Bold geometric BHEL mark */}
        <text
          x="104"
          y="40"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="26"
          letterSpacing="3"
        >
          BHEL
        </text>
      </svg>
    </div>
  );
}
