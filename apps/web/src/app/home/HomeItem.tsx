import { ListItem, ListItemText, Paper, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, To } from 'react-router-dom';
import { ListItemButtonLink } from '../layout/AppNavigation';

interface HomeItemProps {
  to?: To;
  title: string;
  description: string;
}

export const HomeItem = ({
  to,
  title,
  description
}: HomeItemProps) => {

  const { palette, typography } = useTheme();

  const content = (
    <ListItemText
      primaryTypographyProps={{
        fontSize: typography.h5.fontSize
      }}
    >
      {title}
    </ListItemText>
  );

  return (
    <Grid xs={12} md={6} p={1}>
      <Paper sx={{p: 1}}>
        <ListItem disablePadding>
          {to ?
            <ListItemButtonLink LinkComponent={Link} to={to}>
              {content}
            </ListItemButtonLink>
            :
            content
          }
        </ListItem>
        <Typography
          variant="body1"
          py={1}
          px={2}
          color={palette.grey[700]}
        >
          {description}
        </Typography>
      </Paper>
    </Grid>
  );
};
