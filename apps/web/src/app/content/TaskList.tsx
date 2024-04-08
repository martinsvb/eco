import { Content } from '@prisma/client';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ContentState } from '@eco/types';
import { TaskItem } from './TaskItem';
import { useTranslation } from 'react-i18next';

interface TaskListProps {
  data: Content[];
}

export const TaskList = ({data}: TaskListProps) => {

  const { t } = useTranslation();

  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down('md'));

  const todo = data.filter(({state}) => state !== ContentState.Done);

  const done = data.filter(({state}) => state === ContentState.Done);

  return (
    <Stack direction={isMobile ? 'column' : 'row'} width={isMobile ? '100%' : 760}>
      <Stack mr={2} width={isMobile ? '100%' : 380}>
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
      <Stack mr={2} width={isMobile ? '100%' : 380}>
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
