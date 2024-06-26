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
  apiGetContacts,
  apiPatchContact,
  apiPostContact,
  unshiftContact,
  apiDeleteContact
} from '@eco/redux';
import { ContactData, ContactFull, ContactItems, getNewContactData } from '@eco/types';
import { appGridClasses } from '../components';

export const useContactsHandlers = (
  setRowModesModel: (value: SetStateAction<GridRowModesModel>) => void,
  setOpen: (value: SetStateAction<boolean>) => void,
  dialogItemId: GridRowId | null
) => {

  const dispatch = useAppDispatch();

  const handleNew = useCallback(
    () => {
      const { id, data } = getNewContactData();
      dispatch(unshiftContact(data as ContactFull));
      setRowModesModel((oldModel) => ({
        [id]: { mode: GridRowModes.Edit, fieldToFocus: ContactItems.Name },
        ...oldModel,
      }));
    },
    [dispatch, setRowModesModel]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetContacts(''));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (dialogItemId) {
        dispatch(apiDeleteContact({id: dialogItemId}));
      }
      setOpen(false);
    },
    [dispatch, dialogItemId, setOpen]
  );

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const items = [
      ContactItems.Name,
      ContactItems.Email,
      ContactItems.Phone,
      ContactItems.Ico,
      ContactItems.Vat,
      ContactItems.Address,
      ContactItems.Country,
      ContactItems.Note
    ];

    let result;
    if (newRow.isNew) {
      result = await dispatch(apiPostContact({body: pick(items, newRow), id: newRow.id}));
    }
    else {
      const body = getObjectDiff<ContactData>(newRow, oldRow, items);
      if (!isEmpty(body)) {
        result = await dispatch(
          apiPatchContact({
            body,
            id: newRow.id
          })
        );
      }
    }

    const isNewContactCreated = newRow.isNew && !result?.type.includes('rejected') && result?.payload.id;
    return {
      ...newRow,
      id: isNewContactCreated ? result?.payload.id : newRow.id,
      isNew: isNewContactCreated ? undefined : newRow.isNew
    } as ContactFull;
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
      getRowClassName: ({row}: GridRowClassNameParams<ContactFull>) => row.isSelected ? appGridClasses.rowSelected : '',
      onRowEditStop: handleRowEditStop,
      onRowModesModelChange: handleRowModesModelChange,
      processRowUpdate
    },
    handleDelete,
    handleRefresh,
    handleNew
  };
};
