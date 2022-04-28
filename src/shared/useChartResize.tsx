import { useEffect, useRef, useState } from "react";

export const useChartResize = (
  minWidth: number
): [React.RefObject<HTMLDivElement>, number] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const [width, setWidth] = useState(minWidth);

  const resizeHandler = (resizeObserverEntry: ResizeObserverEntry[]) => {
    if (timeout.current) {
      clearInterval(timeout.current);
    }

    timeout.current = setTimeout(() => {
      const chartContainer = resizeObserverEntry[0];
      setWidth(Math.max(chartContainer.contentRect.width, minWidth));
    }, 100);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const containerWidth = container.getBoundingClientRect().width;
      setWidth(Math.max(containerWidth, minWidth));

      const resizeObserver = new ResizeObserver(resizeHandler);
      resizeObserver.observe(container);

      return () => {
        resizeObserver.unobserve(container);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, minWidth]);

  return [containerRef, width];
};
