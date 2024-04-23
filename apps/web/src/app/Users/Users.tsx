import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Fab, IconButton, Typography } from '@mui/material';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import { selectUsers, useAppDispatch, useShallowEqualSelector, apiGetUsers } from '@eco/redux';
import { ScopeItems, UserItems } from '@eco/types';
import { routes } from '@eco/config';
import { Buttons } from '../components/buttons/Buttons';
import { nanoid } from '@reduxjs/toolkit';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const EditToolbar = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = nanoid();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export const Users = () => {

  const { t } = useTranslation();

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(
    () => {
      if (!loaded) {
        dispatch(apiGetUsers(''));
      }
    },
    [loaded, dispatch]
  );

  const handleNew = useCallback(
    () => {
      navigate(routes.accountsNew);
    },
    [navigate]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log({id});
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: UserItems.Name,
      headerName: t('labels:name'),
      width: 180,
      editable: true
    },
    {
      field: UserItems.Email,
      headerName: t('labels:email'),
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: UserItems.IsEmailConfirmed,
      headerName: t('labels:isEmailConfirmed'),
      type: 'boolean',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: UserItems.CreatedAt,
      headerName: t('labels:createdAt'),
      type: 'date',
      valueGetter: (value) => new Date(value),
      width: 180,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('labels:actions'),
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users:title')}</Typography>
      <>
        <Box
          sx={{
            height: 'calc(100vh - 180px)',
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            editMode="row"
            loading={isLoading}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
        <Buttons
          isLoading={isLoading}
          scope={ScopeItems.Accounts}
          refreshButton={
            <IconButton
              aria-label={t('users:refresh')}
              onClick={handleRefresh}
              size='large'
              sx={{
                mb: 2
              }}
            >
              <RefreshIcon />
            </IconButton>
          }
          createButton={
            <Fab
              aria-label={t('users:createAccount')}
              onClick={handleNew}
              color='primary'
            >
              <AddIcon />
            </Fab>
          }
        />
      </>
    </>
  );
};
