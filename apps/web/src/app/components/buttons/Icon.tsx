import { ReactNode, memo } from 'react';
import { Tooltip, IconButton, IconButtonProps } from '@mui/material';
import ms from 'ms';

interface IconProps extends Omit<IconButtonProps, 'aria-label'> {
  children: ReactNode;
  title: string;
}

const Icon = ({children, title, ...rest}: IconProps) => {

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
}

export default memo(Icon);
