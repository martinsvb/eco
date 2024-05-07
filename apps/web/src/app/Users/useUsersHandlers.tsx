import { MouseEvent, SetStateAction, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GridRowModesModel, GridRowModes, GridRowModel, GridRowId, GridRowClassNameParams, GridEventListener, GridRowEditStopReasons } from '@mui/x-data-grid';
import * as qs from 'qs';
import { isEmpty, pick } from 'ramda';
import { getObjectDiff } from '@eco/config';
import {
  useAppDispatch,
  apiGetUsers,
  apiPatchUser,
  apiPostUser,
  unshiftUser,
  apiDeleteUser,
  setFilterData
} from '@eco/redux';
import { UserData, UserFull, UserItems, getNewUserData } from '@eco/types';
import { appGridClasses } from '../components/dataGrid/design';

export const useUsersHandlers = (
  loaded: boolean,
  setRowModesModel: (value: SetStateAction<GridRowModesModel>) => void,
  setOpen: (value: SetStateAction<boolean>) => void,
  dialogItemId: GridRowId | null
) => {

  const dispatch = useAppDispatch();

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  useEffect(
    () => { 
      if (!loaded) {
        dispatch(apiGetUsers(''));
      }
    },
    [loaded, dispatch]
  );

  useEffect(
    () => { 
      if (!!filter[UserItems.Name] || !!filter[UserItems.Email]) {
        dispatch(setFilterData(filter));
      }
    },
    [filter, dispatch]
  );

  const handleNew = useCallback(
    () => {
      const { id, data } = getNewUserData();
      dispatch(unshiftUser(data as UserFull));
      setRowModesModel((oldModel) => ({
        [id]: { mode: GridRowModes.Edit, fieldToFocus: UserItems.Name },
        ...oldModel,
      }));
    },
    [dispatch, setRowModesModel]
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

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const items = [UserItems.Name, UserItems.Email, UserItems.Role];
    if (newRow.isNew) {
      dispatch(apiPostUser({body: pick([...items, UserItems.Origin], newRow)}));
    }
    else {
      const body = getObjectDiff<UserData>(newRow, oldRow, items);
      if (!isEmpty(body)) {
        dispatch(
          apiPatchUser({
            body,
            id: newRow.id
          })
        );
      }
    }

    return { ...newRow, isNew: undefined } as UserFull;
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
