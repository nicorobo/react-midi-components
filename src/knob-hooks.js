import { useState, useEffect, useCallback } from 'react';

export const useKnobBehavior = (onChange, knobValue, min = 0, max = 100) => {
	const isControlled = knobValue !== undefined;
	const [value, setValue] = useState(knobValue || 0);
	const [active, setActive] = useState(false);
	const [movement, setMovement] = useState([0, 0]);
	const handleMouseDown = (e) => {
		setActive(true);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};
	const handleDoubleClick = (e) => {
		if (isControlled) onChange(0);
		setValue(0);
	};
	const handleMouseMove = (e) => {
		setMovement([e.movementX, e.movementY]);
	};
	const handleMouseUp = (e) => {
		setActive(false);
		setMovement([0, 0]);
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};
	const cb = useCallback((ref) => {
		if (!ref) return false;
		ref.addEventListener('mousedown', handleMouseDown);
		ref.addEventListener('dblclick', handleDoubleClick);
	}, []);
	//
	useEffect(() => {
		if (movement[0] !== 0) {
			const newValue = Math.min(
				Math.max((!isControlled ? value : knobValue) + movement[0], min),
				max
			);
			if (isControlled) onChange(newValue);
			setValue(newValue);
		}
	}, [movement]);
	// Call onChange if value changes, only if the component is not controlled
	useEffect(() => {
		if (!isControlled) onChange(value);
	}, [value]);
	return [cb, isControlled ? knobValue : value, active];
};
