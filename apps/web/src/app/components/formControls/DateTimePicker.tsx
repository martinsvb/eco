import { FC, Ref, forwardRef, memo } from 'react';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimePickerProps } from './formControlsTypes';
import { DateWrapper } from './DateWrapper';

const DatePicker: FC<DateTimePickerProps> = forwardRef(({
  label,
  name,
  value,
  ...rest
}, ref) => {

  return (
    <DateWrapper
      label={label}
      id={rest.id}
      disabled={rest.disabled}
    >
      <MuiDateTimePicker
        {...rest}
        ampm={false}
        showDaysOutsideCurrentMonth
        inputRef={ref as Ref<HTMLInputElement> | undefined}
        value={value}
      />
    </DateWrapper>
  );
});

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
