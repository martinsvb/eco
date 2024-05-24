import { ChangeEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import {
  apiGetContentList,
  selectContentFilter,
  setContentFilterData,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentFilterData, ContentTypes } from '@eco/types';
import Search from '../../components/search/Search';

export const RecordsColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const [, setSearchParams] = useSearchParams();

  const filter = useShallowEqualSelector(selectContentFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setContentFilterData({[field]: e.target.value}));
    },
    [dispatch, field]
  );

  const handleClear = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value && key !== field ? {...acc, [key]: value} : acc,
        {} as ContentFilterData
      );
      setSearchParams(newFilter);
      dispatch(setContentFilterData({[field]: ''}));
      dispatch(apiGetContentList({type: ContentTypes.Record}));
    },
    [filter, setSearchParams, dispatch, field]
  );

  const handleSearch = useCallback(
    () => {
      const newFilter = Object.entries(filter).reduce(
        (acc, [key, value]) => value  ? {...acc, [key]: value} : acc,
        {} as ContentFilterData
      );
      setSearchParams(newFilter);
      dispatch(apiGetContentList({type: ContentTypes.Record}));
    },
    [filter, setSearchParams, dispatch]
  );

  return (
    <Stack p={1}>
      <Search
        inputProps={{
          onChange: handleChange,
          name: field,
          value: filter[field as keyof ContentFilterData] || '',
        }}
        buttonProps={{
          onClick: handleSearch,
        }}
        handleClear={handleClear}
      />
    </Stack>
  );
}
