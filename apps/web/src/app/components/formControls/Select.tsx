import { FC, forwardRef, memo } from 'react';
import FormControl from '@mui/material/FormControl';
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
  values: SelectValue[];
} & MuiSelectProps<SelectedValue>;

// eslint-disable-next-line no-undef
const BootstrapSelect = styled<(props: MuiSelectProps<SelectedValue>) => JSX.Element>(MuiSelect)(
  ({ theme: { palette, shape, spacing }, error }) => ({
    ...getBaseFormControlShape(palette, shape, error),
    ...getLabelShape(spacing(2.25)),
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
      border: getFocusedBorder(palette, error),
    },
  })
);

const Select: FC<BaseFormControlProps & SelectProps> = forwardRef(
  (
    { disabled, error, FormHelperTextProps, helperText, id, name, required, values, ...rest },
    ref
  ) => {

    const formControlStates = { disabled, error, required };

    return (
      <FormControl {...formControlStates} fullWidth variant="standard">
        <InputLabel {...formControlStates} shrink id={`select-label-${id}`}>
          {rest.label}
        </InputLabel>
        <BootstrapSelect id={id} labelId={`select-label-${id}`} name={name} ref={ref} {...rest}>
          {values.map(({ id: itemId, label: itemLabel }) => (
            <MenuItem key={`${itemId}`} value={itemId}>
              {itemLabel}
            </MenuItem>
          ))}
        </BootstrapSelect>
        <HelperText helperText={helperText} FormHelperTextProps={FormHelperTextProps} error={error} id={id} />
      </FormControl>
    );
  }
);

Select.displayName = 'Select';

export default memo(Select);
