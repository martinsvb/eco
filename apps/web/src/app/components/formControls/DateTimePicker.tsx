// @ts-nocheck
import { FC, memo, useCallback } from 'react';
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import TextField from './TextField';
import { BaseFormControlProps } from './formControlsTypes';

type MuiDateTimePickerFilteredProps = Omit<MuiDateTimePickerProps<Date>, 'name' | 'id' | 'onChange' | 'renderInput'>;

const DateTimePicker: FC<BaseFormControlProps & MuiDateTimePickerFilteredProps> = memo(
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
      <MuiDateTimePicker
        {...rest}
        label={label}
        onChange={handleChange}
        value={value}
        renderInput={({ disabled, error, inputProps, InputProps, inputRef }) => {
          return (
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
          );
        }}
      />
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
