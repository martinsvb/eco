import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  selectErrorsFilter,
  clearErrorsFilterData,
  useAppDispatch,
  useShallowEqualSelector,
  apiGetErrors
} from '@eco/redux';
import { AppGridFilterToolbar } from '../components';

export const ErrorsToolbar = () => {

  const [, setSearchParams] = useSearchParams();
  
  const dispatch = useAppDispatch();

  const errorsFilter = useShallowEqualSelector(selectErrorsFilter);

  const filterValues = Object.values(errorsFilter).filter((value) => value);

  const handleClearFilter = useCallback(
    () => {
      setSearchParams({});
      dispatch(clearErrorsFilterData());
      dispatch(apiGetErrors(''));
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
