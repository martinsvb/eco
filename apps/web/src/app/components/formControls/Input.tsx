import { memo } from 'react';
import { InputBase, InputBaseProps } from '@mui/material';

export interface InputProps {
  inputProps: InputBaseProps;
  inputWidth?: number;
}

export const Input = memo(({
  inputProps,
  inputWidth,
}: InputProps) => {

  return (
    <InputBase
      {...inputProps}
      id={`toggle-table-filter-input-${inputProps.name}`}
      sx={{
        ...inputProps.sx,
        width: inputWidth || '100%',
        p: 0.5
      }}
    />
  );
});
