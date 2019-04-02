import React, { useState } from 'react';
import styled from 'styled-components';
import ConnectionSelect from './ConnectionSelect';

const MIDIConnectionManager = ({
	input,
	output,
	inputs,
	outputs,
	onInputChange,
	onOutputChange,
}) => {
	const [visible, setVisible] = useState(false);
	const handleToggle = () => setVisible(!visible);
	return (
		<Container>
			<Inner visible={visible}>
				{inputs && (
					<ConnectionSelect
						label={'Inputs'}
						connection={input}
						connections={inputs}
						onChange={onInputChange}
					/>
				)}
				{outputs && (
					<ConnectionSelect
						label={'Outputs'}
						connection={output}
						connections={outputs}
						onChange={onOutputChange}
					/>
				)}
			</Inner>
			<Toggle onClick={handleToggle}>Manage MIDI</Toggle>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	font-family: Avenir;
	color: #333;
	text-align: right;
`;

const Toggle = styled.span`
	font-size: 0.8rem;
	padding: 0.5rem;
	cursor: pointer;
	&:hover {
		color: #000;
	}
`;

const Inner = styled.div`
	display: ${(props) => (props.visible ? 'block' : 'none')}
	border: 1px solid #ddd;
	border-radius: 5px;
	margin-bottom: 0.5rem;
	padding: 1rem 1rem 2rem 1rem;
`;

export default MIDIConnectionManager;
