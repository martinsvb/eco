import { ReactNode } from 'react';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { SxProps, Theme } from '@mui/material/styles';

export interface BaseFormControlProps {
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: ReactNode;
  name: string;
  id?: string;
  label?: ReactNode;
  sx?: SxProps<Theme>;
}
