import { ReactNode } from 'react';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

export interface BaseFormControlProps {
  formHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: ReactNode;
  label?: ReactNode;
}

type DatePickerBaseProps = {
  label?: ReactNode;
  id?: string;
};

export type DatePickerProps = DatePickerBaseProps & MuiDatePickerProps<Dayjs>;

export type DateTimePickerProps = DatePickerBaseProps & MuiDateTimePickerProps<Dayjs>;
