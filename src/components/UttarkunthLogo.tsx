import React from 'react';
import fullLogoImg from '../assets/images/uttarkunth-full.png';
import emblemImg from '../assets/images/uttarkunth-emblem.png';

interface UttarkunthLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const UttarkunthLogo: React.FC<UttarkunthLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Dimension scalers
  const emblemSizes = {
    sm: 'h-10 w-10 sm:h-11 sm:w-11',
    md: 'h-12 w-12 sm:h-14 sm:w-14',
    lg: 'h-20 w-20 sm:h-24 sm:w-24',
    xl: 'h-32 w-32 sm:h-40 sm:w-40',
  };

  const fullLogoSizes = {
    sm: 'max-h-12 w-auto',
    md: 'max-h-16 w-auto',
    lg: 'max-h-36 w-auto',
    xl: 'max-h-56 sm:max-h-64 w-auto',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg tracking-[0.2em]',
    md: 'text-lg sm:text-xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.25em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.28em]',
  };

  const subtitleSizes = {
    sm: 'text-[8px] sm:text-[9px] tracking-[0.25em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.32em]',
  };

  const textColor = theme === 'dark' ? '#FFFFFF' : '#1C1917';
  const subtitleColor = theme === 'dark' ? '#D1E0D7' : '#B85D28';

  // 1. Emblem Only: The exact raster emblem mandala
  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={emblemImg}
          alt="Uttarkunth Emblem"
          className={`${emblemSizes[size]} object-contain`}
          loading="eager"
        />
      </div>
    );
  }

  // 2. Horizontal: Exact emblem image + typography
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2 sm:gap-3 ${className}`}>
        <img
          src={emblemImg}
          alt="Uttarkunth Official Emblem"
          className={`${emblemSizes[size]} object-contain shrink-0`}
          loading="eager"
        />
        <div className="flex flex-col text-left">
          <span
            className={`font-serif font-bold leading-none ${textSizes[size]}`}
            style={{ color: textColor }}
          >
            UTTARKUNTH
          </span>
          {showSubtitle && (
            <span
              className={`font-sans uppercase font-medium mt-0.5 sm:mt-1 hidden sm:block ${subtitleSizes[size]}`}
              style={{ color: subtitleColor }}
            >
              Blessings from Tapobhoomi
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Full: The exact complete image logo (emblem + UTTARKUNTH + floral divider + BLESSINGS FROM TAPOBHOOMI)
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {theme === 'dark' ? (
        <div className="p-4 sm:p-5 bg-white/95 rounded-xl shadow-lg border border-white/20 inline-block backdrop-blur-xs">
          <img
            src={fullLogoImg}
            alt="Uttarkunth – Blessings from Tapobhoomi (Official Logo)"
            className={`${fullLogoSizes[size]} object-contain`}
            loading="eager"
          />
        </div>
      ) : (
        <img
          src={fullLogoImg}
          alt="Uttarkunth – Blessings from Tapobhoomi (Official Logo)"
          className={`${fullLogoSizes[size]} object-contain`}
          loading="eager"
        />
      )}
    </div>
  );
};
