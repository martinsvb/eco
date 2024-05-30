import { ChangeEvent, FC, forwardRef, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-material-ui';
import { InputBaseProps, SelectChangeEvent, Stack } from '@mui/material';
import { allowedCountries } from '@eco/config';
import { BaseFormControlProps } from './formControlsTypes';
import Select, { SelectedValue } from './Select';
import { TextField } from './TextField';
import { TCountryCode } from 'countries-list';

export type PhoneFieldProps = BaseFormControlProps & InputBaseProps & Omit<
  PhoneInputProps,
  'component' | 'label' | 'onChange'
>;

const PhoneField: FC<PhoneFieldProps> = forwardRef(({label, onChange, ...rest}, ref) => {

  const { t } = useTranslation();

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
          width: 'calc(100% - 58px)'
        }
      }}
    >
      <Select
        label={t('labels:phoneCountry')}
        fullWidth={false}
        onChange={handleCountryChange}
        value={country}
        values={allowedCountries.map((id) => ({
          id,
          label: id
        }))}
      />
      <ReactPhoneInput
        {...rest}
        inputProps={{
          fullWidth: true,
          ref
        }}
        country={country.toLowerCase()}
        label={label as string}
        component={TextField}
        onChange={handleChange}
      />
    </Stack>
  );
});

PhoneField.displayName = 'PhoneField';

export default memo(PhoneField);
