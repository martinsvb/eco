import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  selectFilter,
  clearFilterData,
  useAppDispatch,
  useShallowEqualSelector,
  apiGetUsers
} from '@eco/redux';
import { AppGridFilterToolbar } from '../components';

export const UsersToolbar = () => {

  const [, setSearchParams] = useSearchParams();
  
  const dispatch = useAppDispatch();

  const usersFilter = useShallowEqualSelector(selectFilter);

  const filterValues = Object.values(usersFilter).filter((value) => value) as string[];

  const handleClearFilter = useCallback(
    () => {
      setSearchParams({});
      dispatch(clearFilterData());
      dispatch(apiGetUsers(''));
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
