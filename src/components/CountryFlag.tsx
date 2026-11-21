export type ExportCountryCode = 'NP' | 'BD' | 'ZA' | 'MM';

interface CountryFlagProps {
  code: ExportCountryCode;
  country: string;
}

export function CountryFlag({ code, country }: CountryFlagProps) {
  if (code === 'NP') {
    return (
      <div
        data-testid={`country-flag-${code.toLowerCase()}`}
        className="w-12 h-9 flex items-center justify-start"
      >
        <svg
          viewBox="0 0 44 48"
          className="h-9 w-auto drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]"
          role="img"
          aria-label={`Flag of ${country}`}
        >
          <path
            d="M3 2 L41 20 L18.5 20 L41 46 L3 46 Z"
            fill="#003893"
            stroke="#003893"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          <path
            d="M5.5 6.2 L34.2 18.2 L13.8 18.2 L35.2 43.2 L5.5 43.2 Z"
            fill="#DC143C"
          />
          {/* Crescent moon with radiant star */}
          <path
            d="M10.2 13.6 A4.5 4.5 0 0 0 18.4 13.6 A3.8 3.8 0 0 1 10.2 13.6 Z"
            fill="#FFFFFF"
          />
          <polygon
            points="14.3,10.6 15.0,12.1 16.6,12.3 15.4,13.4 15.7,15.0 14.3,14.2 12.9,15.0 13.2,13.4 12.0,12.3 13.6,12.1"
            fill="#FFFFFF"
          />
          {/* 12-pointed sun */}
          <polygon
            points="15.0,27.0 16.0,29.5 18.4,28.1 17.8,30.7 20.4,30.9 18.5,32.8 20.4,34.7 17.8,34.9 18.4,37.5 16.0,36.1 15.0,38.6 14.0,36.1 11.6,37.5 12.2,34.9 9.6,34.7 11.5,32.8 9.6,30.9 12.2,30.7 11.6,28.1 14.0,29.5"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }

  if (code === 'BD') {
    return (
      <div
        data-testid={`country-flag-${code.toLowerCase()}`}
        className="w-12 h-9 rounded-md overflow-hidden border border-slate-200/80 shadow-xs shrink-0"
      >
        <svg
          viewBox="0 0 60 36"
          className="w-full h-full block"
          role="img"
          aria-label={`Flag of ${country}`}
        >
          <rect width="60" height="36" fill="#006A4E" />
          <circle cx="27" cy="18" r="10.5" fill="#F42A41" />
        </svg>
      </div>
    );
  }

  if (code === 'ZA') {
    return (
      <div
        data-testid={`country-flag-${code.toLowerCase()}`}
        className="w-12 h-9 rounded-md overflow-hidden border border-slate-200/80 shadow-xs shrink-0"
      >
        <svg
          viewBox="0 0 60 36"
          className="w-full h-full block"
          role="img"
          aria-label={`Flag of ${country}`}
        >
          <rect width="60" height="18" y="0" fill="#E03C31" />
          <rect width="60" height="18" y="18" fill="#001489" />
          <path
            d="M0 0 L24 18 L0 36 M24 18 L60 18"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="11"
          />
          <path
            d="M0 0 L24 18 L0 36 M24 18 L60 18"
            fill="none"
            stroke="#007749"
            strokeWidth="6.8"
          />
          <polygon points="0,4.8 17.6,18 0,31.2" fill="#FFB81C" />
          <polygon points="0,8.2 13.1,18 0,27.8" fill="#000000" />
        </svg>
      </div>
    );
  }

  return (
    <div
      data-testid={`country-flag-${code.toLowerCase()}`}
      className="w-12 h-9 rounded-md overflow-hidden border border-slate-200/80 shadow-xs shrink-0"
    >
      <svg
        viewBox="0 0 60 36"
        className="w-full h-full block"
        role="img"
        aria-label={`Flag of ${country}`}
      >
        <rect width="60" height="12" y="0" fill="#FECB00" />
        <rect width="60" height="12" y="12" fill="#34B233" />
        <rect width="60" height="12" y="24" fill="#EA2839" />
        <polygon
          points="30,7.5 32.8,16.1 41.9,16.1 34.5,21.5 37.3,30.1 30,24.8 22.7,30.1 25.5,21.5 18.1,16.1 27.2,16.1"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}
