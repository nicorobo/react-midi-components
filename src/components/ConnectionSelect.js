import React from 'react';
import styled from 'styled-components';

const ConnectionSelect = ({ label, connection, connections, onChange }) => {
	const handleChange = (e) => onChange(e.target.value);
	return (
		<SelectContainer>
			<label>
				<LabelText>{label}</LabelText>
				<select value={connection ? connection.id : 0} onChange={handleChange}>
					{connections.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
			</label>
		</SelectContainer>
	);
};

const SelectContainer = styled.div`
	margin-bottom: 1rem;
`;

const LabelText = styled.div`
	font-size: 0.75rem;
	margin-bottom: 0.25rem;
`;

export default ConnectionSelect;
