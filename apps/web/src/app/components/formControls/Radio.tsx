import { ChangeEvent, FC, memo, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import HelperText from './HelperText';
import { RadioOption } from './RadioTypes';
import { BaseFormControlProps } from './formControlsTypes';

export interface RadioProps {
  muiRadioProps?: MuiRadioProps;
  options: RadioOption[];
}

const Radio: FC<BaseFormControlProps & RadioProps & FormLabelProps & RadioGroupProps> = ({
  disabled,
  error,
  FormHelperTextProps,
  label,
  helperText,
  id,
  name,
  muiRadioProps,
  onFormControlChange,
  options,
  required,
  row,
  value,
  ...rest
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onFormControlChange) {
        const { value: newValue } = event.target;

        onFormControlChange({ name, value: newValue, hasError: !!required && !newValue });
      }
    },
    [name, onFormControlChange, required]
  );

  const formControlStates = { disabled, error, required };

  return (
    <FormControl {...formControlStates} fullWidth variant="standard">
      {!!label && typeof label === 'string' && (
        <FormLabel {...formControlStates} id={`radio-label-${label}`}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        aria-labelledby={`radio-buttons-group-${name}`}
        name={name}
        row={row}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        {options.map((option) => (
          <FormControlLabel key={option.label} {...option} control={<MuiRadio {...muiRadioProps} />} />
        ))}
      </RadioGroup>
      <HelperText helperText={helperText} FormHelperTextProps={FormHelperTextProps} error={error} id={id} />
    </FormControl>
  );
};

Radio.displayName = 'Radio';

Radio.defaultProps = {
  muiRadioProps: undefined,
};

export default memo(Radio);
