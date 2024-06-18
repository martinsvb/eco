import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import {
  apiGetErrors,
  selectErrorsFilter,
  setErrorsFilterData,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { ErrorsFilterData } from '@eco/types';
import { Search } from '../components';

export const ErrorsColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const { t } = useTranslation();

  const [, setSearchParams] = useSearchParams();

  const filter = useShallowEqualSelector(selectErrorsFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setErrorsFilterData({[field]: e.target.value}));
    },
    [dispatch, field]
  );

  const handleClear = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value && key !== field ? {...acc, [key]: value} : acc,
        {} as ErrorsFilterData
      );
      setSearchParams(newFilter);
      dispatch(setErrorsFilterData({[field]: ''}));
      dispatch(apiGetErrors(''));
    },
    [filter, setSearchParams, dispatch, field]
  );

  const handleSearch = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value  ? {...acc, [key]: value} : acc,
        {} as ErrorsFilterData
      );
      setSearchParams(newFilter);
      dispatch(apiGetErrors(''));
    },
    [filter, setSearchParams, dispatch]
  );

  return (
    <Stack p={1}>
      <Search
        inputProps={{
          onChange: handleChange,
          name: field,
          value: filter[field as keyof ErrorsFilterData] || '',
        }}
        buttonProps={{
          onClick: handleSearch,
        }}
        handleClear={handleClear}
        title={t('labels:filterSearch')}
      />
    </Stack>
  );
}
