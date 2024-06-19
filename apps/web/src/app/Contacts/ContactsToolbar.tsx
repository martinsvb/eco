import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  selectContactFilter,
  clearContactFilterData,
  useAppDispatch,
  useShallowEqualSelector,
  apiGetContacts
} from '@eco/redux';
import { AppGridFilterToolbar } from '../components';

export const ContactsToolbar = () => {

  const [, setSearchParams] = useSearchParams();
  
  const dispatch = useAppDispatch();

  const contactsFilter = useShallowEqualSelector(selectContactFilter);

  const filterValues = Object.values(contactsFilter).filter((value) => value);

  const handleClearFilter = useCallback(
    () => {
      setSearchParams({});
      dispatch(clearContactFilterData());
      dispatch(apiGetContacts(''));
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
