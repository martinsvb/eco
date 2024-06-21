import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import * as qs from 'qs';
import { routes } from '@eco/config';
import { ContentFull, ContentItems, ContentTypes } from '@eco/types';
import { setContentFilterData, useAppDispatch } from '@eco/redux';
import { getDataGridWrapperSx, getDataGridSx } from '../../components/dataGrid/design';
import { useMobilePortraitDetection } from '../../hooks/useMobileDetection';
import { useRecordsColumns } from './useRecordsColumns';
import { RecordsColumnMenu } from './RecordsColumnMenu';
import { RecordsToolbar } from './RecordsToolbar';

interface RecordsProps {
  data: ContentFull[];
  isLoading: boolean;
}

const Records = ({
  data,
  isLoading
}: RecordsProps) => {

  const theme = useTheme();

  const navigate = useNavigate();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { columns } = useRecordsColumns();

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  useEffect(
    () => { 
      if (filter[ContentItems.Title]) {
        dispatch(setContentFilterData(filter));
      }
    },
    [filter, dispatch]
  );

  const handleRowClick = useCallback(
    ({id}: GridRowParams) => {
      navigate(routes.content[ContentTypes.Record].detail.replace(':id', id as string));
    },
    [navigate]
  );

  return (
    <Box sx={getDataGridWrapperSx(theme, isMobilePortrait)}>
      <DataGrid
        rows={data}
        columns={columns}
        editMode="row"
        filterMode="server"
        loading={isLoading}
        onRowClick={handleRowClick}
        slots={{
          columnMenu: RecordsColumnMenu,
          toolbar: RecordsToolbar,
        }}
        sx={getDataGridSx(theme.palette, isMobilePortrait, {isPointerRow: true})}
      />
    </Box>
  );
};

Records.displayName = 'Records';

export default Records;
