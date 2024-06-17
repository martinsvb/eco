import { useCallback } from 'react';
import { GridRowClassNameParams } from '@mui/x-data-grid';
import { useAppDispatch, apiGetErrors } from '@eco/redux';
import { ErrorData } from '@eco/types';
import { appGridClasses } from '../components';

export const useErrorsHandlers = () => {

  const dispatch = useAppDispatch();

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetErrors(''));
    },
    [dispatch]
  );

  return {
    dataGridHandlers:{
      getRowClassName: ({row}: GridRowClassNameParams<ErrorData>) => row.isSelected ? appGridClasses.rowSelected : '',
    },
    handleRefresh
  };
};
