import { ChangeEvent, FC, forwardRef, memo, useCallback, useState } from 'react';
import ReactPhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-material-ui';
import { InputBaseProps, SelectChangeEvent, Stack } from '@mui/material';
import { allowedCountries } from '@eco/config';
import { BaseFormControlProps } from './formControlsTypes';
import { Select, SelectedValue } from './Select';
import { TextField } from './TextField';
import { TCountryCode } from 'countries-list';

export type PhoneFieldProps = BaseFormControlProps & InputBaseProps & Omit<
  PhoneInputProps,
  'component' | 'label' | 'onChange'
>;

export const PhoneField: FC<PhoneFieldProps> = memo(forwardRef(({
  label,
  onChange,
  noBorder,
  noBorderFocus,
  noLabelMargin,
  ...rest
}, ref) => {

  const [ country, setCountry ] = useState(allowedCountries[0]);

  const handleCountryChange = useCallback(
    (event: SelectChangeEvent<SelectedValue>) => {
      setCountry(event.target.value as TCountryCode);
    },
    []
  );

  const handleChange = useCallback(
    (
      value: string,
      data: object | CountryData,
      event: ChangeEvent<HTMLInputElement>,
      formattedValue: string
    ) => {
      onChange?.(event);
    },
    [onChange]
  );

  return (
    <Stack
      direction="row"
      sx={{
        '& .react-tel-input': {
          width: 'calc(100% - 58px)',
          '& .MuiInputBase-root': {
            borderLeft: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }
        }
      }}
    >
      <Select
        label={label as string}
        fullWidth={false}
        noBorder={noBorder}
        noBorderFocus={noBorderFocus}
        noLabelMargin={noLabelMargin}
        onChange={handleCountryChange}
        value={country}
        values={allowedCountries.map((id) => ({
          id,
          label: id
        }))}
        formControlProps={{
          sx: {
            width: '64px',
            '& .MuiInputBase-root': {
              borderRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }
          }
        }}
      />
      <ReactPhoneInput
        {...rest}
        inputProps={{
          fullWidth: true,
          noBorder,
          noBorderFocus,
          noLabelMargin,
          ref
        }}
        country={country.toLowerCase()}
        label=""
        component={TextField}
        onChange={handleChange}
      />
    </Stack>
  );
}));
