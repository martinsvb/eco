import { Content } from '@prisma/client';
import { alpha, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ContentState } from '@eco/types';
import { TaskItem } from './TaskItem';
import { useTranslation } from 'react-i18next';

interface TaskListProps {
  data: Content[];
}

export const TaskList = ({data}: TaskListProps) => {

  const { t } = useTranslation();

  const { breakpoints, palette, shape } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down('md'));

  const todo = data.filter(({state}) => state !== ContentState.Done);

  const done = data.filter(({state}) => state === ContentState.Done);

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      width={isMobile ? '100%' : 800}
      minHeight={isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 180px)'}
    >
      <Stack
        mr={2}
        p={2}
        width={isMobile ? '100%' : 400}
        sx={{
          background: alpha(palette.warning.light, .5),
          borderRadius: shape.borderRadius / 4
        }}
      >
        <Typography
          variant='h4'
          mb={2}
          textAlign='center'
        >
          {t('labels:inProgress')}
        </Typography>
        {todo.map((content) => (
          <TaskItem key={content.id} {...content} />
        ))}
      </Stack>
      <Stack
        mr={2}
        p={2}
        width={isMobile ? '100%' : 400}
        sx={{
          background: alpha(palette.success.light, .5),
          borderRadius: shape.borderRadius / 4
        }}
      >
        <Typography
          variant='h4'
          mb={2}
          textAlign='center'
        >
          {t('labels:done')}
        </Typography>
        {done.map((content) => (
          <TaskItem key={content.id} {...content} />
        ))}
      </Stack>
    </Stack>
  );
};
