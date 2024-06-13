import { ForwardedRef, forwardRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from 'react-hook-form';
import { inputBaseClasses, InputBaseProps, InputLabel, Stack, useTheme } from "@mui/material";
import { ApiOperations } from "@eco/types";
import { selectIsCompaniesLoading, useAppSelector } from "@eco/redux";
import { getFocusedBorder } from "../formControls/formControlsSettings";
import { SearchControl } from "./SearchControl";

export type SearchFieldProps = {
  name: string;
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  handleSearch: () => void;
  setValue: UseFormSetValue<any>;
} & Pick<InputBaseProps, 'onChange' | 'value'>

export const SearchField = forwardRef((
  {
    name,
    id,
    label,
    error,
    helperText,
    value,
    handleSearch,
    setValue,
    ...rest
  }: SearchFieldProps,
  ref: ForwardedRef<unknown>
) => {

  const { t } = useTranslation();

  const { palette, shape } = useTheme();

  const isLoading = useAppSelector((state) => selectIsCompaniesLoading(state, ApiOperations.getExternalItem));

  const handleClear = useCallback(
    () => {
      setValue(name, '');
    },
    [name, setValue]
  );

  return (
    <Stack
      sx={{
        [`& .${inputBaseClasses.focused}`]: {
          [`& .MuiOutlinedInput-notchedOutline`]: {
            border: getFocusedBorder(palette, false),
          },
        },
        [`& .MuiOutlinedInput-notchedOutline`]: {
          border: `1px solid ${palette.grey[800]}`,
          borderRadius: shape.borderRadius / 4,
        },
        '& .MuiInputBase-input': {
          position: 'relative',
          width: '100%'
        },
      }}
    >
      <InputLabel
        shrink
        htmlFor={name}
        error={error}
        sx={{
          lineHeight: 1,
          mb: 0.25
        }}
      >
        {label}
      </InputLabel>
      <SearchControl
        inputProps={{
          ...rest,
          name,
          id: id || name,
          value,
          error
        }}
        inputWidth="100%"
        isLoading={isLoading}
        buttonProps={{
          onClick: handleSearch,
          disabled: !value || error
        }}
        handleClear={handleClear}
        ref={ref}
        title={t('labels:filterSearch')}
        helperText={helperText}
      />
    </Stack>
  )
});
