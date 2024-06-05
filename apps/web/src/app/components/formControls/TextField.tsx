import { FC, ForwardedRef, forwardRef, memo } from 'react';
import FormControl from '@mui/material/FormControl';
import InputBase, { InputBaseProps, inputBaseClasses } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import HelperText from './HelperText';
import { getBaseFormControlShape, getFocusedBorder, getLabelShape } from './formControlsSettings';
import { BaseFormControlProps } from './formControlsTypes';

export interface CustomTextFieldProps extends InputBaseProps {
  noNumberArrows?: boolean;
}

export type TextFieldProps = BaseFormControlProps & CustomTextFieldProps;

const noNumberArrowsStyle = {
  appearance: 'none',
  margin: 0,
};

const BootstrapInput = styled<FC<TextFieldProps>>(InputBase, {
  shouldForwardProp: (prop) => (
    !['noNumberArrows', 'noBorder', 'noBorderFocus', 'noLabelMargin'].includes(prop as string)
  ),
})(({
  theme: { palette, shape, spacing, transitions },
  error,
  noNumberArrows,
  noBorder,
  noBorderFocus,
  noLabelMargin
}) => ({
  ...getBaseFormControlShape(palette, shape, error, noBorder),
  ...getLabelShape(!noLabelMargin ? spacing(2.25) : 0),
  padding: spacing(1.5),
  [`&.${inputBaseClasses.focused}`]: {
    border: getFocusedBorder(palette, error, noBorderFocus),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    width: '100%',
    padding: 0,
    transition: transitions.create(['border-color', 'background-color', 'box-shadow']),
  },
  '& .MuiInputBase-input[type=number]': noNumberArrows
    ? {
        appearance: 'textfield',
      }
    : undefined,
  '& .MuiInputBase-input::-webkit-outer-spin-button': noNumberArrows ? noNumberArrowsStyle : undefined,
  '& .MuiInputBase-input::-webkit-inner-spin-button': noNumberArrows ? noNumberArrowsStyle : undefined,
}));

export const TextField: FC<TextFieldProps> = memo(forwardRef(
  (
    {
      defaultValue,
      disabled,
      error,
      formHelperTextProps,
      helperText,
      id,
      label,
      onChange,
      required,
      ...rest
    },
    ref: ForwardedRef<unknown>
  ) => {

    const formControlStates = { disabled, error, required };

    return (
      <FormControl {...formControlStates} fullWidth variant="standard">
        <InputLabel {...formControlStates} shrink htmlFor={id}>
          {label}
        </InputLabel>
        <BootstrapInput
          defaultValue={defaultValue}
          id={id}
          onChange={onChange}
          ref={ref}
          {...formControlStates}
          {...rest}
        />
        <HelperText
          helperText={helperText}
          formHelperTextProps={formHelperTextProps}
          error={error}
          id={id}
        />
      </FormControl>
    );
  }
));
