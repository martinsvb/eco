import { ReactNode } from 'react';
import { FormHelperTextProps } from '@mui/material/FormHelperText';

export interface BaseFormControlProps {
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: ReactNode;
  label?: ReactNode;
}
