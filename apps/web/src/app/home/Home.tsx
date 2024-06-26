import { useTranslation } from 'react-i18next';
import { Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { routes } from '@eco/config';
import { useAppSelector, selectIsUserLoggedIn, useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import { ScopeItems, UserRoles } from '@eco/types';
import { useMobileDetection } from '../hooks';
import { Countries } from './Countries';
import { HomeItem } from './HomeItem';

export const Home = () => {

  const { t } = useTranslation();

  const isMobile = useMobileDetection();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { rights: { scopes }, role } = useShallowEqualSelector(selectUserAuth);

  return (
    <Stack
      mr={2}
    >
      <Typography variant='h2' mb={2}>{t('home')}</Typography>
      <Divider sx={{mb: 4}} />
      <Grid container rowSpacing={2} columnSpacing={2} width={isMobile ? '100%' : 800} alignSelf="center">
        <HomeItem
          to={isUserLoggedIn && scopes[ScopeItems.Records]?.read ? routes.content.record.list : undefined}
          title={t('records')}
          description={t('recordsDescription')}
        />
        <HomeItem
          to={isUserLoggedIn && scopes[ScopeItems.Tasks]?.read ? routes.content.task.list : undefined}
          title={t('tasks')}
          description={t('tasksDescription')}
        />
        <HomeItem
          to={isUserLoggedIn && scopes[ScopeItems.Accounts]?.read ? routes.accounts : undefined}
          title={t('accounts')}
          description={t('accountsDescription')}
        />
        <HomeItem
          to={isUserLoggedIn && scopes[ScopeItems.Contacts]?.read ? routes.contacts : undefined}
          title={t('contacts')}
          description={t('contactsDescription')}
        />
        <HomeItem
          to={isUserLoggedIn && scopes[ScopeItems.Users]?.read ? routes.users : undefined}
          title={t('users')}
          description={t('usersDescription')}
        />
        <HomeItem
          to={isUserLoggedIn && scopes[ScopeItems.Companies]?.read ? routes.companies : undefined}
          title={role === UserRoles.Admin ? t('companies') : t('company')}
          description={t('companiesDescription')}
        />
      </Grid>
      <Countries />
    </Stack>
  );
};
