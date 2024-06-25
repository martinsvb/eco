import { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, To } from 'react-router-dom';
import { ListItemButtonLink } from '../layout/AppNavigation';

interface HomeItemProps {
  to?: To;
  title: string;
  description: string;
  icon: ReactNode;
}

export const HomeItem = ({
  to,
  title,
  description,
  icon
}: HomeItemProps) => {

  const content = (
    <>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText>
        {title}
      </ListItemText>
    </>
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
        <Typography variant="body1" p={1}>{description}</Typography>
      </Paper>
    </Grid>
  );
};
