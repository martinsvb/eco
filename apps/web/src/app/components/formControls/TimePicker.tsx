//@ts-nocheck
import { FC, memo } from 'react';
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';

import TextField from './TextField';
import { BaseFormControlProps } from './formControlsTypes';

type MuiTimePickerFilteredProps = Omit<MuiTimePickerProps<Date>, 'renderInput'>;

const DatePicker: FC<BaseFormControlProps & MuiTimePickerFilteredProps> = memo(
  ({ FormHelperTextProps, helperText, id, label, name, value, ...rest }) => {

    return (
      <MuiTimePicker
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
