import { ChangeEvent, useCallback } from 'react';
import { Stack } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import { apiGetUsers, selectFilter, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { UserFilterData } from '@eco/types';
import Search from '../components/search/Search';

export const UsersColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const filter = useShallowEqualSelector(selectFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilterData({[field]: e.target.value}));
    },
    [dispatch]
  );

  const handleClear = useCallback(
    () => {
      dispatch(setFilterData({[field]: ''}));
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
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
