import { ReactElement, ReactNode, memo } from 'react';
import { Tooltip } from '@mui/material';
import ms from 'ms';
import { GridActionsCellItem, GridActionsCellItemProps } from '@mui/x-data-grid';

type AppGridButtonProps = {
  children: ReactElement;
  title?: ReactNode;
} & Omit<GridActionsCellItemProps, 'showInMenu'>;

export const AppGridButton = memo(({children, color, title, ...rest}: AppGridButtonProps) => {

  return (
    // @ts-expect-error: Incompatible IconButtonProps and MenuItemProps in GridActionsCellItemProps
    <GridActionsCellItem
      {...rest}
      icon={
        <Tooltip
          title={title || rest.label}
          enterDelay={ms('0.1s')}
        >
          {children}
        </Tooltip>
      }
      color={color || 'inherit'}
    />
  )
});
