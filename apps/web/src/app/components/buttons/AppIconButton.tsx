import { ReactNode, memo } from 'react';
import { Tooltip, IconButton, IconButtonProps } from '@mui/material';
import ms from 'ms';

interface AppIconButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  children: ReactNode;
  title: string;
}

export const AppIconButton = memo(({children, title, ...rest}: AppIconButtonProps) => {

  return (
    <Tooltip
      title={title}
      enterDelay={ms('0.1s')}
    >
      <span>
        <IconButton
          aria-label={title}
          {...rest}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  )
});
