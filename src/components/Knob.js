import React from 'react';
import styled from 'styled-components';
import { useKnobBehavior } from '../knob-hooks';

const noselect =
	'-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	${noselect}
`;
const KnobBody = styled.div`
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
// transform: rotate(${(props) => props.rotate}deg);
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

const Knob = ({ value, onChange, title, min = 0, max = 100, fullAngle = 270 }) => {
	const [ref, knobValue, active] = useKnobBehavior(onChange, value, min, max);
	const currentDeg = getAngle(knobValue, fullAngle, min, max);
	const gradient = getGradient(fullAngle, currentDeg);
	return (
		<Container>
			{title && <Title>{title}</Title>}
			<KnobBody ref={ref} gradient={gradient} rotate={currentDeg}>
				<KnobInner />
			</KnobBody>
			<Value>{knobValue}</Value>
		</Container>
	);
};

const getAngle = (value, fullAngle, min, max) => {
	const startAngle = (360 - fullAngle) / 2;
	const endAngle = startAngle + fullAngle;
	return Math.floor(convertRange(min, max, startAngle, endAngle, value));
};

const getGradient = (
	fullAngle,
	currentDeg,
	activeColor = 'orange',
	inactiveColor = '#eee',
	backgroundColor = '#fff'
) => {
	const startAngle = (360 - fullAngle) / 2;
	return `conic-gradient(from ${startAngle - 180}deg, ${activeColor} ${currentDeg -
		startAngle}deg, ${inactiveColor} ${currentDeg -
		startAngle}deg ${fullAngle}deg, ${backgroundColor} ${fullAngle}deg)`;
};

const convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
	return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};

export default Knob;
