/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { FC, memo, useCallback } from 'react';
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';

import TextField from './TextField';
import { BaseFormControlProps } from './formControlsTypes';

type MuiTimePickerFilteredProps = Omit<MuiTimePickerProps<Date>, 'name' | 'id' | 'onChange' | 'renderInput'>;

const DatePicker: FC<BaseFormControlProps & MuiTimePickerFilteredProps> = memo(
  ({ FormHelperTextProps, helperText, id, label, name, onFormControlChange, value, ...rest }) => {
    const handleChange = useCallback(
      (date: Date | null, keyboardInputValue?: string) => {
        if (onFormControlChange) {
          onFormControlChange({ name, value: date, datePickers: { keyboardInputValue } });
        }
      },
      [name, onFormControlChange]
    );

    return (
      <MuiTimePicker
        {...rest}
        label={label}
        onChange={handleChange}
        value={value}
        renderInput={({ disabled, error, inputProps, InputProps, inputRef }) => (
          <TextField
            {...InputProps}
            disabled={disabled}
            error={error}
            FormHelperTextProps={FormHelperTextProps}
            helperText={helperText}
            id={id}
            inputProps={inputProps}
            label={label}
            name={name}
            ref={inputRef}
          />
        )}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
