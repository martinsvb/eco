import { Dispatch, MouseEvent, MutableRefObject, SetStateAction, useCallback } from 'react';
import {
  GridRowModesModel,
  GridRowModes,
  GridRowModel,
  GridRowId,
  GridRowClassNameParams,
  GridEventListener,
  GridRowEditStopReasons
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
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
import { CompaniesErrors, companySchema } from './useCompaniesColumns';

export const useCompaniesHandlers = (
  apiRef: MutableRefObject<GridApiCommunity>,
  setRowModesModel: (value: SetStateAction<GridRowModesModel>) => void,
  setOpen: (value: SetStateAction<boolean>) => void,
  dialogItemId: GridRowId | null,
  setErrors: Dispatch<SetStateAction<CompaniesErrors>>,
) => {

  const dispatch = useAppDispatch();

  const handleNew = useCallback(
    async () => {
      const { id, data } = getNewCompanyData();
      await dispatch(unshiftCompany(data as CompanyFull));

      const row = apiRef.current.getRow(id);
      let isValid = true;
      try {
        await companySchema.validate(row, {abortEarly: true});
      }
      catch (error) {
        isValid = false;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        valid: {
          ...prevErrors.valid,
          [id]: isValid
        }
      }));

      setRowModesModel((oldModel) => ({
        [id]: { mode: GridRowModes.Edit, fieldToFocus: CompanyItems.Name },
        ...oldModel,
      }));
    },
    [apiRef, dispatch, setErrors, setRowModesModel]
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

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const items = [
      CompanyItems.Name,
      CompanyItems.Email,
      CompanyItems.Ico,
      CompanyItems.Vat,
      CompanyItems.Address,
      CompanyItems.Country
    ];

    let result;
    if (newRow.isNew) {
      result = await dispatch(apiPostCompany({body: pick(items, newRow), id: newRow.id}));
    }
    else {
      const body = getObjectDiff<CompanyData>(newRow, oldRow, items);
      if (!isEmpty(body)) {
        result = await dispatch(
          apiPatchCompany({
            body,
            id: newRow.id
          })
        );
      }
    }

    const isNewCompanyCreated = newRow.isNew && !result?.type.includes('rejected') && result?.payload.id;
    return {
      ...newRow,
      id: isNewCompanyCreated ? result?.payload.id : newRow.id,
      isNew: isNewCompanyCreated ? undefined : newRow.isNew
    } as CompanyFull;
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
