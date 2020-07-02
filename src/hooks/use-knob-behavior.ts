import { useState, useEffect, useCallback } from 'react';

type Args = {
  onChange: (value: number) => void;
  value?: number;
  min?: number;
  max?: number;
};

export const useKnobBehavior = ({
  onChange,
  value,
  min = 0,
  max = 100,
}: Args) => {
  const isControlled = value !== undefined;
  const [knobValue, setKnobValue] = useState(value || 0);
  const [active, setActive] = useState(false);
  const [movement, setMovement] = useState([0, 0]);
  const handleMouseDown = () => {
    setActive(true);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const handleDoubleClick = () => {
    if (isControlled) onChange(0);
    setKnobValue(0);
  };
  const handleMouseMove = (e: MouseEvent) => {
    setMovement([e.movementX, e.movementY]);
  };
  const handleMouseUp = () => {
    setActive(false);
    setMovement([0, 0]);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  const knobRef = useCallback((el) => {
    if (!el) return false;
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('dblclick', handleDoubleClick);
  }, []);

  useEffect(() => {
    if (movement[0] !== 0) {
      const newValue = Math.min(
        Math.max((!isControlled ? knobValue : value) + movement[0], min),
        max
      );
      if (isControlled) onChange(newValue);
      setKnobValue(newValue);
    }
  }, [movement]);
  // Call onChange if value changes, only if the component is not controlled
  useEffect(() => {
    if (!isControlled) onChange(knobValue);
  }, [knobValue]);
  return { knobRef, value: isControlled ? value : knobValue, active };
};
