import { ReactNode } from 'react';
import { Box, Card, CardActions, CardContent, CardProps, Stack, Typography } from '@mui/material';
import { useMobileDetection } from '../../hooks/useMobileDetection';

interface AppCardProps extends CardProps {
  actions: ReactNode;
  actionsAvailable?: boolean;
  cardTitle: ReactNode;
  label?: ReactNode;
  textContent?: ReactNode;
  htmlContent?: ReactNode;
  background?: string;
}

export const AppCard = ({
  actions,
  actionsAvailable,
  cardTitle,
  background,
  label,
  textContent,
  htmlContent
}: AppCardProps) => {

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
        {!!textContent &&
          <Typography variant='body1' color="text.secondary" gutterBottom>
            {textContent}
          </Typography>
        }
        {!!htmlContent &&
          <Box dangerouslySetInnerHTML={{__html: htmlContent}} />
        }
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
