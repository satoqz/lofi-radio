import { useEffect, useRef } from "react";

export const useInterval = (callback: () => unknown, interval: number) => {
  const savedCallback = useRef<typeof callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current && savedCallback.current();
    if (interval) {
      const id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
};
