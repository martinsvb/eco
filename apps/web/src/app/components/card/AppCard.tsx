import { ReactNode } from 'react';
import { Card, CardActions, CardContent, CardProps, Stack, Typography } from '@mui/material';
import { useMobileDetection } from '../../hooks/useMobileDetection';

interface AppCardProps extends CardProps {
  actions: ReactNode;
  actionsAvailable?: boolean;
  cardTitle: ReactNode;
  label?: ReactNode;
  cardContent: ReactNode;
  background?: string;
}

export const AppCard = ({actions, actionsAvailable, cardTitle, background, label, cardContent}: AppCardProps) => {

  const isMobile = useMobileDetection();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        width: isMobile ? '100%' : 370,
        background,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="div" mb={1}>
            {cardTitle}
          </Typography>
          {label}
        </Stack>
        <Typography variant='body1' color="text.secondary" gutterBottom>
          {cardContent}
        </Typography>
      </CardContent>
      {!!actionsAvailable &&
        <CardActions
          sx={{
            justifyContent: 'center'
          }}
        >
          {actions}
        </CardActions>
      }
    </Card>
  );
};
