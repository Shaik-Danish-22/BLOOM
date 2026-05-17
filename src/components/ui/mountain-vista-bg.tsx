import React, { useMemo } from 'react';

/**
 * @fileOverview Mountain Vista Parallax Background.
 * Renders a multi-layered parallax landscape with moving cyclists.
 */

const layersData = [
  { className: 'layer-6', speed: '120s', size: '222px', zIndex: 1, image: '6' },
  { className: 'layer-5', speed: '95s',  size: '311px', zIndex: 1, image: '5' },
  { className: 'layer-4', speed: '75s',  size: '468px', zIndex: 1, image: '4' },
  { className: 'bike-1',  speed: '10s',  size: '75px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '100px', noRepeat: true },
  { className: 'bike-2',  speed: '15s',  size: '75px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '100px', noRepeat: true },
  { className: 'layer-3', speed: '55s',  size: '158px', zIndex: 3, image: '3' },
  { className: 'layer-2', speed: '30s',  size: '145px', zIndex: 4, image: '2' },
  { className: 'layer-1', speed: '20s',  size: '136px', zIndex: 5, image: '1' },
];

interface MountainVistaParallaxProps {
  title?: string;
  subtitle?: string;
}

const MountainVistaParallax = ({ title = '', subtitle = '' }: MountainVistaParallaxProps) => {
  // Generate dynamic CSS for each layer
  const dynamicStyles = useMemo(() => {
    return layersData
      .map(layer => {
        const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/24650/${layer.image}.png`;
        return `
          .${layer.className} {
            background-image: url(${url});
            animation-duration: ${layer.speed};
            background-size: auto ${layer.size};
            z-index: ${layer.zIndex};
            ${layer.animation ? `animation-name: ${layer.animation};` : ''}
            ${layer.bottom ? `bottom: ${layer.bottom};` : ''}
            ${layer.noRepeat ? 'background-repeat: no-repeat;' : ''}
          }
        `;
      })
      .join('\n');
  }, []);

  return (
    <div
      className="hero-container w-full h-full relative overflow-hidden"
      aria-label="An animated parallax landscape of mountains and cyclists."
    >
      <style>{dynamicStyles}</style>

      {/* Render each parallax layer */}
      {layersData.map(layer => (
        <div
          key={layer.className}
          className={`parallax-layer absolute inset-0 bg-repeat-x bg-bottom ${layer.className}`}
          style={{ animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
        />
      ))}

      {/* Hero text */}
      <div className="hero-content relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        {title && <h1 className="hero-title text-4xl md:text-6xl font-headline italic text-white mb-4 drop-shadow-2xl">{title}</h1>}
        {subtitle && <p className="hero-subtitle text-lg text-white/60 font-light italic max-w-lg">{subtitle}</p>}
      </div>
    </div>
  );
};

export default React.memo(MountainVistaParallax);
