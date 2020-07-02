import React from 'react';
import styled from 'styled-components';
import { Input, Output } from '@react-midi/hooks';

const SelectContainer = styled.div`
  margin-bottom: 1rem;
`;

const LabelText = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

type Connection = Input | Output;
type Props = {
  label: string;
  connection: Connection;
  connections: Connection[];
  onChange: (id: string) => void;
};

export const ConnectionSelect: React.FC<Props> = ({
  label,
  connection,
  connections,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(e.target.value);
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
