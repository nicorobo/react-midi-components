import React, { useEffect, useState } from 'react';
import {
  useMIDIOutput,
  useMIDIControl,
  Output,
  Input,
} from '@react-midi/hooks';
import { Knob } from './Knob';

type Props = {
  title: string;
  output: Output;
  input: Input;
  control?: number;
  channel?: number;
};

export const MIDIKnob: React.FC<Props> = ({
  title,
  output,
  input,
  control = 6,
  channel = 1,
}) => {
  const [value, setValue] = useState(0);
  const { cc } = useMIDIOutput(output);
  const controlInput = useMIDIControl(input, { target: control, channel });
  useEffect(() => {
    setValue(controlInput.value);
  }, [controlInput.value]);
  const handleChange = (value: number) => {
    setValue(value);
    cc(value, control, channel);
  };
  return (
    <Knob
      title={title}
      value={value}
      min={0}
      max={127}
      onChange={handleChange}
    />
  );
};
