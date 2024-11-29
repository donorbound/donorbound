"use client";

import type React from "react";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface FlickeringGridProperties {
  color?: string;
  width?: number;
  height?: number;
  gridGap?: number;
  className?: string;
  squareSize?: number;
  maxOpacity?: number;

  flickerChance?: number;
}

const FlickeringGrid: React.FC<FlickeringGridProperties> = ({
  className,
  color = "rgb(0, 0, 0)",
  flickerChance = 0.3,
  gridGap = 6,
  height,
  maxOpacity = 0.3,
  squareSize = 4,
  width,
}) => {
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const containerReference = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });

  const memoizedColor = useMemo(() => {
    if (typeof globalThis === "undefined") {
      return "rgba(0, 0, 0,";
    }

    const toRGBA = (color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d");
      if (!context) return "rgba(255, 0, 0,";
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data];
      return `rgba(${r}, ${g}, ${b},`;
    };

    return toRGBA(color);
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let index = 0; index < squares.length; index++) {
        squares[index] = Math.random() * maxOpacity;
      }

      return { cols, dpr, rows, squares };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let index = 0; index < squares.length; index++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[index] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      context: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "transparent";
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < cols; index++) {
        for (let index_ = 0; index_ < rows; index_++) {
          const opacity = squares[index * rows + index_];
          context.fillStyle = `${memoizedColor}${opacity})`;
          context.fillRect(
            index * (squareSize + gridGap) * dpr,
            index_ * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap],
  );

  useEffect(() => {
    const canvas = canvasReference.current;
    const container = containerReference.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId: number;
    let gridParameters: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ height: newHeight, width: newWidth });
      gridParameters = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParameters.squares, deltaTime);
      drawGrid(
        context,
        canvas.width,
        canvas.height,
        gridParameters.cols,
        gridParameters.rows,
        gridParameters.squares,
        gridParameters.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerReference} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasReference}
        className="pointer-events-none"
        style={{
          height: canvasSize.height,
          width: canvasSize.width,
        }}
      />
    </div>
  );
};

export default FlickeringGrid;
