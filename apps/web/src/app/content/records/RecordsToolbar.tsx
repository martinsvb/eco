import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ContentTypes } from '@eco/types';
import {
  selectContentFilter,
  clearContentFilterData,
  useAppDispatch,
  useShallowEqualSelector,
  apiGetContentList
} from '@eco/redux';
import { AppGridFilterToolbar } from '../../components';

export const RecordsToolbar = () => {

  const [, setSearchParams] = useSearchParams();
  
  const dispatch = useAppDispatch();

  const recordsFilter = useShallowEqualSelector(selectContentFilter);

  const filterValues = Object.values(recordsFilter).filter((value) => value);

  const handleClearFilter = useCallback(
    () => {
      setSearchParams({});
      dispatch(clearContentFilterData());
      dispatch(apiGetContentList({type: ContentTypes.Record}));
    },
    [dispatch, setSearchParams]
  )

  return (
    filterValues.length ?
      <AppGridFilterToolbar
        filterValues={filterValues}
        handleClearFilter={handleClearFilter}
      />
      :
      null
  );
};
