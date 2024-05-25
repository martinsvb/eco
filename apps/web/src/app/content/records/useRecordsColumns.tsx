import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { ContentItems, ContentTypes } from '@eco/types';
import { selectUserAuth, useShallowEqualSelector } from '@eco/redux';
import { columnSettings } from '../../helpers/dataGrid';
import { useMemo } from 'react';
import ContentDeleteButton from '../ContentDeleteButton';

interface RecordsColumns {
  columns: GridColDef[];
}

export const useRecordsColumns = (): RecordsColumns => {

  const { t } = useTranslation();

  const { rights: { scopes: { records } } } = useShallowEqualSelector(selectUserAuth);

  const columns = useMemo(
    () => {
      let recordsColumns: GridColDef[] = [
        {
          ...columnSettings(ContentItems.Title, 200, 'left'),
          headerName: t('labels:title'),
        },
        {
          ...columnSettings(ContentItems.DateTime, 200, 'left'),
          headerName: t('labels:dateTime'),
          type: 'string',
          valueFormatter: (value) => value ? dayjs(value).format('DD. MM. YYYY HH:mm') : '',
          disableColumnMenu: true,
        },
      ];

      if (records.delete) {
        recordsColumns = [
          ...recordsColumns,
          {
            field: 'actions',
            type: 'actions',
            headerName: t('labels:actions'),
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
    
              return [
                <ContentDeleteButton id={id as string} type={ContentTypes.Record} />
              ];
            },
          },
        ];
      }

      return recordsColumns;
    },
    [records, t]
  );

  return {
    columns
  }
};
