import React, { useEffect, useState } from 'react';
import { useMIDIOutput, useMIDIControl } from '@react-midi/hooks';
import Knob from './Knob';

const MIDIKnob = ({ title, output, input, control = 6, channel = 1 }) => {
	const [value, setValue] = useState(0);
	const { cc } = useMIDIOutput(output);
	const controlInput = useMIDIControl(input, { control, channel });
	useEffect(() => {
		setValue(controlInput.value);
	}, [controlInput.value]);
	const handleChange = (value) => {
		setValue(value);
		cc(value, control, channel);
	};
	return <Knob title={title} value={value} min={0} max={127} onChange={handleChange} />;
};

export default MIDIKnob;
