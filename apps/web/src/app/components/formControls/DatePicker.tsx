import { FC, memo } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps } from './formControlsTypes';

const DatePicker: FC<DatePickerProps> = ({
  id,
  label,
  name,
  value,
  ...rest
}) => {

  return (
    <DemoItem label={label}>
      <MuiDatePicker
        {...rest}
        value={value}
      />
    </DemoItem>
  );
}

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
