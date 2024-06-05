import { MouseEvent, SetStateAction, useCallback } from 'react';
import {
  GridRowModesModel,
  GridRowModes,
  GridRowModel,
  GridRowId,
  GridRowClassNameParams,
  GridEventListener,
  GridRowEditStopReasons
} from '@mui/x-data-grid';
import { isEmpty, pick } from 'ramda';
import { getObjectDiff } from '@eco/config';
import {
  useAppDispatch,
  apiGetCompanies,
  apiPatchCompany,
  apiPostCompany,
  unshiftCompany,
  apiDeleteCompany
} from '@eco/redux';
import { CompanyData, CompanyFull, CompanyItems, getNewCompanyData } from '@eco/types';
import { appGridClasses } from '../components/dataGrid/design';

export const useCompaniesHandlers = (
  setRowModesModel: (value: SetStateAction<GridRowModesModel>) => void,
  setOpen: (value: SetStateAction<boolean>) => void,
  dialogItemId: GridRowId | null
) => {

  const dispatch = useAppDispatch();

  const handleNew = useCallback(
    () => {
      const { id, data } = getNewCompanyData();
      dispatch(unshiftCompany(data as CompanyFull));
      setRowModesModel((oldModel) => ({
        [id]: { mode: GridRowModes.Edit, fieldToFocus: CompanyItems.Name },
        ...oldModel,
      }));
    },
    [dispatch, setRowModesModel]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetCompanies(''));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (dialogItemId) {
        dispatch(apiDeleteCompany({id: dialogItemId}));
      }
      setOpen(false);
    },
    [dispatch, dialogItemId, setOpen]
  );

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const items = [CompanyItems.Name, CompanyItems.Country];
    if (newRow.isNew) {
      dispatch(apiPostCompany({body: pick(items, newRow)}));
    }
    else {
      const body = getObjectDiff<CompanyData>(newRow, oldRow, items);
      if (!isEmpty(body)) {
        dispatch(
          apiPatchCompany({
            body,
            id: newRow.id
          })
        );
      }
    }

    return { ...newRow, isNew: undefined } as CompanyFull;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  return {
    dataGridHandlers:{
      getRowClassName: ({row}: GridRowClassNameParams<CompanyFull>) => row.isSelected ? appGridClasses.rowSelected : '',
      onRowEditStop: handleRowEditStop,
      onRowModesModelChange: handleRowModesModelChange,
      processRowUpdate
    },
    handleDelete,
    handleRefresh,
    handleNew
  };
};
