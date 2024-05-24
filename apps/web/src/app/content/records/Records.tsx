import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { routes } from '@eco/config';
import { ContentFull, ContentTypes } from '@eco/types';
import { useRecordsColumns } from './useRecordsColumns';
import { RecordsColumnMenu } from './RecordsColumnMenu';
import { getDataGridWrapperSx, getDataGridSx } from '../../components/dataGrid/design';
import { useMobilePortraitDetection } from '../../hooks/useMobileDetection';

interface RecordsProps {
  data: ContentFull[];
  isLoading: boolean;
}

const Records = ({
  data,
  isLoading
}: RecordsProps) => {

  const { palette } = useTheme();

  const navigate = useNavigate();

  const isMobilePortrait = useMobilePortraitDetection();

  const { columns } = useRecordsColumns();

  const handleRowClick = useCallback(
    ({id}: GridRowParams) => {
      navigate(routes.content[ContentTypes.Record].edit.replace(':id', id as string));
    },
    [navigate]
  );

  return (
    <Box sx={getDataGridWrapperSx(isMobilePortrait)}>
      <DataGrid
        rows={data}
        columns={columns}
        editMode="row"
        filterMode="server"
        loading={isLoading}
        onRowClick={handleRowClick}
        slots={{
          columnMenu: RecordsColumnMenu,
        }}
        sx={getDataGridSx(palette, isMobilePortrait)}
      />
    </Box>
  );
};

Records.displayName = 'Records';

export default Records;
