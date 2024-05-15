import { FC, Ref, forwardRef, memo } from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps } from './formControlsTypes';
import { DateWrapper } from './DateWrapper';

const DatePicker: FC<DatePickerProps> = forwardRef(({
  id,
  label,
  value,
  ...rest
}, ref) => {

  return (
    <DateWrapper
      label={label}
      id={id}
      disabled={rest.disabled}
    >
      <MuiDatePicker
        {...rest}
        showDaysOutsideCurrentMonth
        inputRef={ref as Ref<HTMLInputElement> | undefined}
        value={value}
        slotProps={{
          textField: {
            inputProps: {
              id
            }
          }
        }}
      />
    </DateWrapper>
  );
})

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
