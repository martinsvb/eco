import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { ContentItems } from '@eco/types';
import { columnSettings } from '../../helpers/dataGrid';

interface RecordsColumns {
  columns: GridColDef[];
}

export const useRecordsColumns = (): RecordsColumns => {

  const { t } = useTranslation();

  return {
    columns: [
      {
        ...columnSettings(ContentItems.Title, 240, 'left'),
        headerName: t('labels:title'),
      },
      {
        ...columnSettings(ContentItems.DateTime, 200),
        headerName: t('labels:dateTime'),
        type: 'string',
        valueFormatter: (value) => value ? dayjs(value).format('DD. MM. YYYY HH:mm') : '',
        disableColumnMenu: true,
      },
    ]
  }
};
