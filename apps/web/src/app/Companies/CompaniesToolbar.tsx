import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  selectCompanyFilter,
  clearCompanyFilterData,
  useAppDispatch,
  useShallowEqualSelector,
  apiGetCompanies
} from '@eco/redux';
import { AppGridFilterToolbar } from '../components';

export const CompaniesToolbar = () => {

  const [, setSearchParams] = useSearchParams();
  
  const dispatch = useAppDispatch();

  const companiesFilter = useShallowEqualSelector(selectCompanyFilter);

  const filterValues = Object.values(companiesFilter).filter((value) => value);

  const handleClearFilter = useCallback(
    () => {
      setSearchParams({});
      dispatch(clearCompanyFilterData());
      dispatch(apiGetCompanies(''));
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
