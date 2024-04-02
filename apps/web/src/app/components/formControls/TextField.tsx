import { FC, ForwardedRef, forwardRef, memo } from 'react';
import FormControl from '@mui/material/FormControl';
import InputBase, { InputBaseProps, inputBaseClasses } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import HelperText from './HelperText';
import { getBaseFormControlShape, getFocusedBorder, getLabelShape } from './formControlsSettings';
import { BaseFormControlProps } from './formControlsTypes';

export interface CustomTextFieldProps extends Omit<InputBaseProps, 'name'> {
  noNumberArrows?: boolean;
}

const noNumberArrowsStyle = {
  appearance: 'none',
  margin: 0,
};

const BootstrapInput = styled<FC<CustomTextFieldProps>>(InputBase, {
  shouldForwardProp: (prop) => prop !== 'noNumberArrows',
})(({ theme: { palette, shape, spacing, transitions }, error, noNumberArrows }) => ({
  ...getBaseFormControlShape(palette, shape, error),
  ...getLabelShape(spacing(2.25)),
  padding: spacing(1.5),
  [`&.${inputBaseClasses.focused}`]: {
    border: getFocusedBorder(palette, error),
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

const TextField: FC<BaseFormControlProps & CustomTextFieldProps> = forwardRef(
  (
    {
      defaultValue,
      disabled,
      error,
      FormHelperTextProps,
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
        <HelperText helperText={helperText} FormHelperTextProps={FormHelperTextProps} error={error} id={id} />
      </FormControl>
    );
  }
);

TextField.displayName = 'TextField';

export default memo(TextField);
