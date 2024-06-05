import { ChangeEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import {
  apiGetCompanies,
  selectCompanyFilter,
  setCompanyFilterData,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { CompanyFilterData } from '@eco/types';
import { Search } from '../components';

export const CompaniesColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const [, setSearchParams] = useSearchParams();

  const filter = useShallowEqualSelector(selectCompanyFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setCompanyFilterData({[field]: e.target.value}));
    },
    [dispatch, field]
  );

  const handleClear = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value && key !== field ? {...acc, [key]: value} : acc,
        {} as CompanyFilterData
      );
      setSearchParams(newFilter);
      dispatch(setCompanyFilterData({[field]: ''}));
      dispatch(apiGetCompanies(''));
    },
    [dispatch, setSearchParams, field, filter]
  );

  const handleSearch = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value  ? {...acc, [key]: value} : acc,
        {} as CompanyFilterData
      );
      setSearchParams(newFilter);
      dispatch(apiGetCompanies(''));
    },
    [dispatch, setSearchParams, filter]
  );

  return (
    <Stack p={1}>
      <Search
        inputProps={{
          onChange: handleChange,
          name: field,
          value: filter[field as keyof CompanyFilterData] || '',
        }}
        buttonProps={{
          onClick: handleSearch,
        }}
        handleClear={handleClear}
      />
    </Stack>
  );
}
