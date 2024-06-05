import { ChangeEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import { apiGetUsers, selectFilter, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { UserFilterData } from '@eco/types';
import { Search } from '../components';

export const UsersColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const [, setSearchParams] = useSearchParams();

  const filter = useShallowEqualSelector(selectFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilterData({[field]: e.target.value}));
    },
    [dispatch, field]
  );

  const handleClear = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value && key !== field ? {...acc, [key]: value} : acc,
        {} as UserFilterData
      );
      setSearchParams(newFilter);
      dispatch(setFilterData({[field]: ''}));
      dispatch(apiGetUsers(''));
    },
    [filter, setSearchParams, dispatch, field]
  );

  const handleSearch = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value  ? {...acc, [key]: value} : acc,
        {} as UserFilterData
      );
      setSearchParams(newFilter);
      dispatch(apiGetUsers(''));
    },
    [filter, setSearchParams, dispatch]
  );

  return (
    <Stack p={1}>
      <Search
        inputProps={{
          onChange: handleChange,
          name: field,
          value: filter[field as keyof UserFilterData] || '',
        }}
        buttonProps={{
          onClick: handleSearch,
        }}
        handleClear={handleClear}
      />
    </Stack>
  );
}
