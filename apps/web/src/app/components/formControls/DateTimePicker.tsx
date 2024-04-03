// @ts-nocheck
import { FC, memo } from 'react';
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import TextField from './TextField';
import { BaseFormControlProps } from './formControlsTypes';

type MuiDateTimePickerFilteredProps = Omit<MuiDateTimePickerProps<Date>, 'renderInput'>;

const DateTimePicker: FC<BaseFormControlProps & MuiDateTimePickerFilteredProps> = memo(
  ({ FormHelperTextProps, helperText, id, label, name, value, ...rest }) => {

    return (
      <MuiDateTimePicker
        {...rest}
        label={label}
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
