//@ts-nocheck
import { FC, memo } from 'react';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import TextField from './TextField';
import { BaseFormControlProps } from './formControlsTypes';

type MuiDatePickerFilteredProps = Omit<MuiDatePickerProps<Date>, 'renderInput'>;

const DatePicker: FC<BaseFormControlProps & MuiDatePickerFilteredProps> = memo(
  ({ FormHelperTextProps, helperText, id, label, name, value, ...rest }) => {

    return (
      <MuiDatePicker
        {...rest}
        label={label}
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
