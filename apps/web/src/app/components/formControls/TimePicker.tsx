import { FC, Ref, forwardRef, memo } from 'react';
import { useTheme } from '@mui/material';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimePickerProps } from './formControlsTypes';
import { DateWrapper } from './DateWrapper';
import { getScrollbarDesign } from '@eco/config';

const TimePicker: FC<TimePickerProps> = forwardRef(({
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
      <MuiTimePicker
        {...rest}
        ampm={false}
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

TimePicker.displayName = 'TimePicker';

export default memo(TimePicker);
