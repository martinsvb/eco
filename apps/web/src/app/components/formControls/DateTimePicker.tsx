import { FC, memo } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimePickerProps } from './formControlsTypes';

const DatePicker: FC<DateTimePickerProps> = ({
  id,
  label,
  name,
  value,
  ...rest
}) => {

  return (
    <DemoItem label={label}>
      <MuiDateTimePicker
        {...rest}
        value={value}
      />
    </DemoItem>
  );
}

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
