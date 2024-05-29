import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Stack, StackProps, useTheme } from '@mui/material';
import { ContentFull, ContentState } from '@eco/types';
import { TaskItem } from './TaskItem';
import { AppAccordion } from '../../components';
import { useMobileDetection } from '../../hooks/useMobileDetection';

enum TaskItems {
  InProgress = 'inProgress',
  Done = 'done',
}

interface TaskListProps {
  data: ContentFull[];
  direction?: StackProps['direction'];
  expandedInProgress?: boolean;
  expandedDone?: boolean;
}

export const TaskList = ({
  data,
  direction,
  expandedInProgress,
  expandedDone
}: TaskListProps) => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const isMobile = useMobileDetection();

  const [ expanded, setExpanded ] = useState({
    [TaskItems.InProgress]: !!expandedInProgress,
    [TaskItems.Done]: !!expandedDone,
  });

  const isColumn = direction === 'column' || isMobile;

  const inProgress = data.filter(({state}) => state !== ContentState.Done);

  const done = data.filter(({state}) => state === ContentState.Done);

  const handleClick = (name: TaskItems) => () => {
    setExpanded((prevExpanded) => ({...prevExpanded, [name]: !prevExpanded[name]}));
  };

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
          expanded={expanded.inProgress}
          id="tasksInProgressHeader"
          onClick={handleClick(TaskItems.InProgress)}
          title={t('labels:inProgress', {length: inProgress.length})}
          sx={{
            background: alpha(palette.warning.light, .5),
          }}
        >
          {inProgress.map((content) => (
            <TaskItem key={content.id} {...content} />
          ))}
        </AppAccordion>
      </Stack>
      <Stack
        mr={2}
        width={isColumn ? '100%' : 420}
      >
        <AppAccordion
          expanded={expanded.done}
          id="tasksDoneHeader"
          onClick={handleClick(TaskItems.Done)}
          title={t('labels:done', {length: done.length})}
          sx={{
            background: alpha(palette.success.light, .5),
          }} 
        >
          {done.map((content) => (
            <TaskItem key={content.id} {...content} />
          ))}
        </AppAccordion>
      </Stack>
    </Stack>
  );
};
