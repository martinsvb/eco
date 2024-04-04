import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Account } from '@prisma/client';
import { Card, CardActions, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { routes } from '@eco/config';
import ms from 'ms';

export const AccountItem = ({id, name, iban, currency}: Account) => {

  const { t } = useTranslation();

  const navigate = useNavigate();
 
  const handleEdit = useCallback(
    () => {
      navigate(`${routes.base}${routes.accountsEdit.replace(':id', id)}`);
    },
    [navigate, id]
  );

  return (
    <Card variant="outlined" sx={{mb: 2}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="div" mb={1}>
            {name}
          </Typography>
          <Chip label={currency} />
        </Stack>
        <Typography variant='body1' color="text.secondary" gutterBottom>
          {iban}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'end'
        }}
      >
        <Tooltip
          title={t('labels:edit')}
          enterDelay={ms('0.1s')}
        >
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
