import { Theme, useMediaQuery } from '@mui/material';
import Desktop from './layout/Desktop';
import Mobile from './layout/Mobile';

export default () => {
  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`
  });

  return (
    isMobilePortrait
      ? <Mobile />
      : <Desktop />
  );
}
