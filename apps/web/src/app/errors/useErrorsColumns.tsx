import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { ErrorItems, UserItems, UserRoles } from '@eco/types';
import { columnSettings } from '../helpers';

interface ErrorsColumns {
  columns: GridColDef[];
}

export const useErrorsColumns = (): ErrorsColumns => {

  const { t } = useTranslation();

  const roles = useMemo(
    () => {
      return {
        [UserRoles.Reader]: t('users:roleReader'),
        [UserRoles.Editor]: t('users:roleEditor'),
        [UserRoles.ApprovalEditor]: t('users:roleApprovalEditor'),
        [UserRoles.CompanyAdmin]: t('users:roleCompanyAdmin'),
        [UserRoles.Admin]: t('users:roleAdmin'),
      } as {[key: string]: string}
    },
    [t]
  );

  return {
    columns: [
      {
        ...columnSettings(ErrorItems.Id, 300, 'left'),
        sortable: false,
        headerName: t('labels:id'),
      },
      {
        ...columnSettings(ErrorItems.Name, 260, 'left'),
        headerName: t('labels:name'),
      },
      {
        ...columnSettings(ErrorItems.Code, 100, 'left'),
        sortable: false,
        disableColumnMenu: true,
        headerName: t('labels:code'),
      },
      {
        ...columnSettings(ErrorItems.UserName, 200, 'left'),
        headerName: t('labels:userName'),
      },
      {
        ...columnSettings(UserItems.Email, 200, 'left'),
        headerName: t('labels:email'),
      },
      {
        ...columnSettings(UserItems.IsEmailConfirmed, 80),
        headerName: t('labels:isEmailConfirmed'),
        type: 'boolean',
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(UserItems.Role, 200),
        headerName: t('labels:role'),
        valueFormatter: (value) => roles[value],
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(ErrorItems.CreatedAt, 180),
        headerName: t('labels:createdAt'),
        type: 'string',
        valueFormatter: (value) => dayjs(value).format('DD. MM. YYYY'),
        disableColumnMenu: true,
      },
    ],
  }
};
