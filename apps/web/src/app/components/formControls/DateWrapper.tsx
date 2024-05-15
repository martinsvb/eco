import { ReactNode } from 'react';
import { InputLabel, Stack, inputBaseClasses, useTheme } from '@mui/material';
import { DateTimePickerProps } from './formControlsTypes';
import { getFocusedBorder } from './formControlsSettings';

export const DateWrapper = ({
  id,
  disabled,
  label,
  children
}: Pick<DateTimePickerProps, 'id' | 'disabled' | 'label'> & {children: ReactNode}) => {

  const formControlStates = { disabled };

  const { palette, shape } = useTheme();

  return (
    <Stack
      sx={{
        [`& .${inputBaseClasses.focused}`]: {
          [`& .MuiOutlinedInput-notchedOutline`]: {
            border: getFocusedBorder(palette, false),
          },
        },
        [`& .MuiOutlinedInput-notchedOutline`]: {
          border: `1px solid ${palette.grey[500]}`,
          borderRadius: shape.borderRadius / 4,
        },
        '& .MuiInputBase-input': {
          position: 'relative',
          width: '100%',
          p: 1.6,
          fontSize: 14
        },
      }}
    >
      <InputLabel
        {...formControlStates}
        shrink
        htmlFor={id}
        sx={{
          lineHeight: 1,
          mb: 0.25
        }}
      >
        {label}
      </InputLabel>
      {children}
    </Stack>
  )
}
