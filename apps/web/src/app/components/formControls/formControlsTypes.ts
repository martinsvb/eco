import { ReactNode } from 'react';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export interface BaseFormControlProps {
  formHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: ReactNode;
  label?: ReactNode;
  noBorder?: boolean;
  noBorderFocus?: boolean;
  noLabelMargin?: boolean;
}

type DatePickerBaseProps = {
  label?: ReactNode;
  id?: string;
};

export type DatePickerProps = DatePickerBaseProps & MuiDatePickerProps<Dayjs>;

export type DateTimePickerProps = DatePickerBaseProps & MuiDateTimePickerProps<Dayjs>;

export type TimePickerProps = DatePickerBaseProps & MuiTimePickerProps<Dayjs>;
