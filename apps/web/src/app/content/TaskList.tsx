import { useTranslation } from 'react-i18next';
import { alpha, Stack, StackProps, useTheme } from '@mui/material';
import { ContentFull, ContentState } from '@eco/types';
import { TaskItem } from './TaskItem';
import { useMobileDetection } from '../hooks/useMobileDetection';
import AppAccordion from '../components/accordion/AppAccordion';

interface TaskListProps {
  data: ContentFull[];
  direction?: StackProps['direction'];
}

export const TaskList = ({data, direction}: TaskListProps) => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const isMobile = useMobileDetection();

  const isColumn = direction || isMobile;

  return (
    <Stack
      direction={isColumn ? 'column' : 'row'}
      width={isColumn ? '100%' : 840}
      minHeight={isColumn ? undefined : 'calc(100vh - 180px)'}
    >
      <Stack
        mr={2}
        mb={isColumn ? 2 : undefined}
        width={isColumn ? '100%' : 420}
      >
        <AppAccordion
          defaultExpanded
          id="tasksInProgressHeader"
          title={t('labels:inProgress')}
          sx={{
            background: alpha(palette.warning.light, .5),
          }}
        >
          {data.filter(({state}) => state !== ContentState.Done).map((content) => (
            <TaskItem key={content.id} {...content} />
          ))}
        </AppAccordion>
      </Stack>
      <Stack
        mr={2}
        width={isColumn ? '100%' : 420}
      >
        <AppAccordion
          defaultExpanded
          id="tasksDoneHeader"
          title={t('labels:done')}
          sx={{
            background: alpha(palette.success.light, .5),
          }} 
        >
          {data.filter(({state}) => state === ContentState.Done).map((content) => (
            <TaskItem key={content.id} {...content} />
          ))}
        </AppAccordion>
      </Stack>
    </Stack>
  );
};
