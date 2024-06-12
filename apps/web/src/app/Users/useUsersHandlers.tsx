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
  apiGetUsers,
  apiPatchUser,
  apiPostUser,
  unshiftUser,
  apiDeleteUser
} from '@eco/redux';
import { UserData, UserFull, UserItems, getNewUserData } from '@eco/types';
import { appGridClasses } from '../components';
import { UsersErrors, userSchema } from './useUsersColumns';

export const useUsersHandlers = (
  apiRef: MutableRefObject<GridApiCommunity>,
  setRowModesModel: (value: SetStateAction<GridRowModesModel>) => void,
  setOpen: (value: SetStateAction<boolean>) => void,
  setErrors: Dispatch<SetStateAction<UsersErrors>>,
  dialogItemId: GridRowId | null
) => {

  const dispatch = useAppDispatch();

  const handleNew = useCallback(
    async () => {
      const { id, data } = getNewUserData();

      await dispatch(unshiftUser(data as UserFull));

      const row = apiRef.current.getRow(id);
      let isValid = true;
      try {
        await userSchema.validate(row, {abortEarly: true});
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
        [id]: { mode: GridRowModes.Edit, fieldToFocus: UserItems.Name },
        ...oldModel,
      }));
    },
    [apiRef, dispatch, setErrors, setRowModesModel]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (dialogItemId) {
        dispatch(apiDeleteUser({id: dialogItemId}));
      }
      setOpen(false);
    },
    [dispatch, dialogItemId, setOpen]
  );

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const items = [UserItems.Name, UserItems.Email, UserItems.Role, UserItems.Phone];

    let result;
    if (newRow.isNew) {
      result = await dispatch(apiPostUser({body: pick([...items, UserItems.Origin], newRow), id: newRow.id}));
    }
    else {
      const body = getObjectDiff<UserData>(newRow, oldRow, items);
      if (!isEmpty(body)) {
        result = await dispatch(
          apiPatchUser({
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
    } as UserFull;
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
      getRowClassName: ({row}: GridRowClassNameParams<UserFull>) => row.isSelected ? appGridClasses.rowSelected : '',
      onRowEditStop: handleRowEditStop,
      onRowModesModelChange: handleRowModesModelChange,
      processRowUpdate
    },
    handleDelete,
    handleRefresh,
    handleNew
  };
};
