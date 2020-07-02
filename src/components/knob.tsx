import React from 'react';
import styled from 'styled-components';
import { useKnobBehavior } from '../hooks/use-knob-behavior';

const noselect =
  '-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${noselect}
`;

const KnobBody = styled.div<{ gradient: string }>`
  height: 40px;
  width: 40px;
  background: ${(props) => props.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KnobInner = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #fff;
`;

// I'm not sure what this stuff was for
// transform: rotate(${(props) => props.rotate}deg);
// <KnobBody ref={knobRef} gradient={gradient} rotate={currentDeg}>

const Value = styled.div`
  margin-top: -0.5rem;
  font-family: Avenir;
  font-size: 0.75rem;
  color: #333;
`;

const Title = styled.div`
  font-family: Avenir;
  font-size: 0.75rem;
  color: #333;
`;

type Props = {
  value?: number;
  title?: string;
  min?: number;
  max?: number;
  fullAngle?: number;
  onChange: (value: number) => void;
};
export const Knob: React.FC<Props> = ({
  value: controlledValue,
  onChange,
  title,
  min = 0,
  max = 100,
  fullAngle = 270,
}) => {
  const { knobRef, value } = useKnobBehavior({
    onChange,
    value: controlledValue,
    min,
    max,
  });
  const currentDeg = calculateAngle({ value, fullAngle, min, max });
  const gradient = calculateGradient({ fullAngle, currentDeg });
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <KnobBody ref={knobRef} gradient={gradient}>
        <KnobInner />
      </KnobBody>
      <Value>{value}</Value>
    </Container>
  );
};

type calculateAngleArgs = {
  value: number;
  fullAngle: number;
  min: number;
  max: number;
};

const calculateAngle = ({ value, fullAngle, min, max }: calculateAngleArgs) => {
  const startAngle = (360 - fullAngle) / 2;
  const endAngle = startAngle + fullAngle;
  return Math.floor(convertRange({ min, max, startAngle, endAngle, value }));
};

type calculateGradientArgs = {
  fullAngle: number;
  currentDeg: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
};

const calculateGradient = ({
  fullAngle,
  currentDeg,
  activeColor = 'orange',
  inactiveColor = '#eee',
  backgroundColor = '#fff',
}: calculateGradientArgs) => {
  const startAngle = (360 - fullAngle) / 2;
  return `conic-gradient(from ${startAngle - 180}deg, ${activeColor} ${
    currentDeg - startAngle
  }deg, ${inactiveColor} ${
    currentDeg - startAngle
  }deg ${fullAngle}deg, ${backgroundColor} ${fullAngle}deg)`;
};

type convertRangeArgs = {
  min: number;
  max: number;
  startAngle: number;
  endAngle: number;
  value: number;
};

const convertRange = ({
  min,
  max,
  startAngle,
  endAngle,
  value,
}: convertRangeArgs) => {
  return ((value - min) * (endAngle - startAngle)) / (max - min) + startAngle;
};
