import { memo } from 'react';
import { InputBase, InputBaseProps, Stack } from '@mui/material';
import HelperText from './HelperText';

export interface InputProps {
  inputProps: InputBaseProps;
  helperText?: string;
  inputWidth?: number;
}

export const Input = memo(({
  inputProps,
  inputWidth,
  helperText
}: InputProps) => {

  const id = `toggle-table-filter-input-${inputProps.name}`;

  return (
    <Stack
      justifyContent="center"
      width="100%"
    >
      <InputBase
        {...inputProps}
        id={id}
        sx={{
          ...inputProps.sx,
          width: inputWidth || '100%',
          p: 0.5
        }}
      />
      {inputProps.error &&
        <HelperText
          formHelperTextProps={{
            sx: {
              px: 0.5
            }
          }}
          id={`${id}-helperText`}
          helperText={helperText}
        />
      }
    </Stack>
  );
});
