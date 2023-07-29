import { useLayoutEffect, useState } from 'react';

const highlightBounds = [0.2, 0.8];

const Glow = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useLayoutEffect(() => {
    document.onmousemove = (event) => {
      const e = event;
      setX(e.clientX);
      setY(e.clientY);

      const insideHighlightArea =
        (e.clientX > 0 && e.clientX < window.innerWidth * highlightBounds[0]) ||
        (e.clientX > window.innerWidth * highlightBounds[1] && e.clientX < window.innerWidth) ||
        (e.clientY > 0 && e.clientY < window.innerHeight * highlightBounds[0]) ||
        (e.clientY > window.innerHeight * highlightBounds[1] && e.clientY < window.innerHeight);

      const tiles = document.querySelectorAll('.animated-grid-tile');
      tiles.forEach((tile) => {
        if (
          e.clientX > tile.offsetLeft &&
          e.clientX < tile.offsetLeft + tile.offsetWidth &&
          e.clientY > tile.offsetTop &&
          e.clientY < tile.offsetTop + tile.offsetHeight
        ) {
          if (insideHighlightArea) {
            tile.classList.add('bg-red-100/50');
          }
        } else {
          tile.classList.remove('bg-red-100/50');
        }
      });
    };
  });

  return (
    <div
      id="cursor"
      className="block fixed z-[60] pointer-events-none rounded-full mix-blend-screen duration-0"
      style={{
        top: y,
        left: x,
        boxShadow: '0 0 150px 30px rgba(255, 0, 0, 0.5)',
        transform: `skew(-${40}deg, ${20 + 30 * (x / screen.width)}deg)`
      }}
    />
  );
};

const Background = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex flex-wrap z-30">
      {Array(500)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-[15vw] h-[15vw] sm:w-[10vw] sm:h-[10vw] md:w-[8vw] md:h-[8vw] xl:w-[5vw] xl:h-[5vw] 2xl:w-[4vw] 2xl:h-[4vw] border border-background opacity-100 blur-[1px] transition-all duration-200 animated-grid-tile"
          />
        ))}
      <Glow />
    </div>
  );
};

export default Background;
