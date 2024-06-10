import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import {
  apiGetContacts,
  selectContactFilter,
  setContactFilterData,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { ContactFilterData } from '@eco/types';
import { Search } from '../components';

export const ContactsColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const { t } = useTranslation();

  const [, setSearchParams] = useSearchParams();

  const filter = useShallowEqualSelector(selectContactFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setContactFilterData({[field]: e.target.value}));
    },
    [dispatch, field]
  );

  const handleClear = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value && key !== field ? {...acc, [key]: value} : acc,
        {} as Record<string, string>
      );
      setSearchParams(newFilter);
      dispatch(setContactFilterData({[field]: ''}));
      dispatch(apiGetContacts(''));
    },
    [dispatch, setSearchParams, field, filter]
  );

  const handleSearch = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value  ? {...acc, [key]: value} : acc,
        {} as Record<string, string>
      );
      setSearchParams(newFilter);
      dispatch(apiGetContacts(''));
    },
    [dispatch, setSearchParams, filter]
  );

  return (
    <Stack p={1}>
      <Search
        inputProps={{
          onChange: handleChange,
          name: field,
          value: filter[field as keyof ContactFilterData] || '',
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
