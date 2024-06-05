import { FC, forwardRef, memo } from 'react';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import HelperText from './HelperText';
import { SelectValue } from './SelectTypes';
import { getBaseFormControlShape, getFocusedBorder, getLabelShape } from './formControlsSettings';
import { BaseFormControlProps } from './formControlsTypes';

export type SelectedValue = number | string | undefined;

export type SelectProps = {
  formControlProps?: FormControlProps;
  fullWidth?: boolean;
  values: SelectValue[];
} & MuiSelectProps<SelectedValue> & Pick<BaseFormControlProps, 'noBorder' | 'noBorderFocus' | 'noLabelMargin'>

// eslint-disable-next-line no-undef
const BootstrapSelect = styled<(props: Omit<SelectProps, 'values'>) => JSX.Element>(MuiSelect, {
  shouldForwardProp: (prop) => (
    !['noBorder', 'noBorderFocus', 'noLabelMargin'].includes(prop as string)
  ),
})(({
    theme: { palette, shape, spacing },
    error,
    noBorder,
    noBorderFocus,
    noLabelMargin
  }) => ({
    ...getBaseFormControlShape(palette, shape, error, noBorder),
    ...getLabelShape(!noLabelMargin ? spacing(2.25) : 0),
    '& .MuiSelect-select': {
      padding: spacing(1.5),
    },
    '&.MuiInputBase-root': {
      padding: 0,
    },
    '&.MuiInputBase-root:before': {
      display: 'none',
    },
    '&.MuiInputBase-root:before, &.MuiInputBase-root:after': {
      border: 0,
    },
    '&.MuiInputBase-root&.Mui-focused': {
      border: getFocusedBorder(palette, error, noBorderFocus),
    },
  })
);

export const Select: FC<BaseFormControlProps & SelectProps> = memo(forwardRef(
  (
    {
      disabled,
      error,
      fullWidth = true,
      formControlProps,
      formHelperTextProps,
      helperText,
      id,
      name,
      required,
      values,
      variant = 'standard',
      ...rest
    },
    ref
  ) => {

    const formControlStates = { disabled, error, required };

    return (
      <FormControl
        {...formControlProps}
        {...formControlStates}
        fullWidth={fullWidth}
        variant={variant}
      >
        <InputLabel
          {...formControlStates}
          shrink
          id={`select-label-${id}`}
        >
          {rest.label}
        </InputLabel>
        <BootstrapSelect
          id={id}
          labelId={`select-label-${id}`}
          name={name}
          ref={ref}
          variant={variant}
          {...formControlStates}
          {...rest}
        >
          {values?.map(({ id: itemId, label: itemLabel }) => (
            <MenuItem key={`${itemId}`} value={itemId}>
              {itemLabel}
            </MenuItem>
          ))}
        </BootstrapSelect>
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
