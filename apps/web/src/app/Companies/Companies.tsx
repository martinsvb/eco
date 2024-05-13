import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMobilePortraitDetection } from '@eco/config';
import { selectCompanies, useShallowEqualSelector } from '@eco/redux';
import { useCompaniesColumns } from './useCompaniesColumns';
import { useDialog } from '../components/dialog/AppDialog';
import { CompaniesColumnMenu } from './CompaniesColumnMenu';
import { getDataGridSx, getDataGridWrapperSx } from '../components/dataGrid/design';
import CompaniesButtons from './CompaniesButtons';
import CompaniesDialog from './CompaniesDialog';
import { useCompaniesHandlers } from './useCompaniesHandlers';

export const Companies = () => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const { companies, isLoading, loaded } = useShallowEqualSelector(selectCompanies);

  const { open, setOpen, dialogItemId, handleClickOpen, handleClose } = useDialog();

  const { columns, rowModesModel, setRowModesModel } = useCompaniesColumns(handleClickOpen);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useCompaniesHandlers(loaded, setRowModesModel, setOpen, dialogItemId);

  return (
    <>
      <Typography variant='h3' mb={3}>{t('companies:title')}</Typography>
      <Box sx={getDataGridWrapperSx(isMobilePortrait)}>
        <DataGrid
          rows={companies}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          rowModesModel={rowModesModel}
          {...dataGridHandlers}
          slots={{
            columnMenu: CompaniesColumnMenu,
          }}
          sx={getDataGridSx(palette, isMobilePortrait)}
        />
      </Box>
      <CompaniesButtons
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        handleNew={handleNew}
      />
      <CompaniesDialog
        isLoading={isLoading}
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};
