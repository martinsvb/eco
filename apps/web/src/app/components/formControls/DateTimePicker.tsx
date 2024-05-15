import { FC, Ref, forwardRef, memo } from 'react';
import { useTheme } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimePickerProps } from './formControlsTypes';
import { DateWrapper } from './DateWrapper';
import { getScrollbarDesign } from '@eco/config';

const DatePicker: FC<DateTimePickerProps> = forwardRef(({
  id,
  label,
  value,
  ...rest
}, ref) => {

  const { palette: { background, grey } } = useTheme();

  return (
    <DateWrapper
      label={label}
      id={id}
      disabled={rest.disabled}
    >
      <MuiDateTimePicker
        {...rest}
        ampm={false}
        showDaysOutsideCurrentMonth
        inputRef={ref as Ref<HTMLInputElement> | undefined}
        value={value}
        slotProps={{
          textField: {
            inputProps: {
              id
            }
          },
          desktopPaper: {
            sx: {
              '& .MuiMultiSectionDigitalClock-root': {
                '& .MuiList-root': {
                  ...getScrollbarDesign({
                    trackColor: background.default,
                    thumbColor: grey[500],
                  }),
                }
              }
            }
          }
        }}
      />
    </DateWrapper>
  );
});

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
