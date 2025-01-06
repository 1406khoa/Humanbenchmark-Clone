import React, { useState, useEffect } from 'react';
import { lazyLoadImage } from '../utils/imageOptimization';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

export const LazyImage = React.memo(function LazyImage({ 
  src, 
  fallback = '', 
  alt = '', 
  className = '',
  ...props 
}: LazyImageProps) {
  const [loadedSrc, setLoadedSrc] = useState(fallback);

  useEffect(() => {
    lazyLoadImage(src)
      .then(() => setLoadedSrc(src))
      .catch(() => console.error('Failed to load image:', src));
  }, [src]);

  return (
    <img
      src={loadedSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      loading="lazy"
      {...props}
    />
  );
});