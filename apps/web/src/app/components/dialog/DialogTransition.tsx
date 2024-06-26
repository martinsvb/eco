import { forwardRef } from 'react';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

export const DialogTransition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
