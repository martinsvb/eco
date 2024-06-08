import { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from 'react-hook-form';
import { ApiOperations } from "@eco/types";
import {
  apiGetCompanyFromAres,
  selectIsCompaniesLoading,
  useAppDispatch,
  useAppSelector
} from "@eco/redux";
import { Search } from "../components";
import { inputBaseClasses, InputLabel, Stack, useTheme } from "@mui/material";
import { getFocusedBorder } from "../components/formControls/formControlsSettings";

interface CompanySearchFieldProps {
  name: string;
  label: string;
  defaultValue?: string | null;
  setValue: UseFormSetValue<any>;
}

export const CompanySearchField = ({
  name,
  label,
  defaultValue,
  setValue
}: CompanySearchFieldProps) => {

  const { t } = useTranslation();

  const { palette, shape } = useTheme();

  const dispatch = useAppDispatch();

  const [valueState, setValueState] = useState(defaultValue || '');

  const isLoading = useAppSelector((state) => selectIsCompaniesLoading(state, ApiOperations.getExternalItem));

  const handleChange = useCallback(
    async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setValueState(value);
      setValue(name, value);
    },
    [name, setValue],
  );

  const handleClear = useCallback(
    () => {
      setValueState('');
    },
    []
  );

  const handleSearch = useCallback(
    () => {
      if (valueState) {
        dispatch(apiGetCompanyFromAres({ico: `${valueState}`, setValue}));
      }
    },
    [dispatch, setValue, valueState]
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
        sx={{
          lineHeight: 1,
          mb: 0.25
        }}
      >
        {label}
      </InputLabel>
      <Search
        inputProps={{
          onChange: handleChange,
          name,
          id: name,
          value: valueState || '',
        }}
        inputWidth="100%"
        isLoading={isLoading}
        buttonProps={{
          onClick: handleSearch,
          disabled: !valueState
        }}
        handleClear={handleClear}
        title={t('labels:filterSearch')}
      />
    </Stack>
  )
}
