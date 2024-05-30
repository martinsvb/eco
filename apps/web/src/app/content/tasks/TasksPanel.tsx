import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';
import { selectContentChilds, selectUserAuth, useShallowEqualSelector } from '@eco/redux';
import { ContentState, ContentTypes, ScopeItems } from '@eco/types';
import { useMobilePortraitDetection } from '../../hooks';
import { TaskList } from './TaskList';
import TaskAddButton from './TaskAddButton';

interface TasksPanelProps {
  parentId: string;
}

const TasksPanel = ({parentId}: TasksPanelProps) => {

  const { t } = useTranslation();

  const isMobilePortrait = useMobilePortraitDetection();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const { data } = useShallowEqualSelector((state) => selectContentChilds(state, ContentTypes.Task, parentId));

  return (
    <Box width={isMobilePortrait ? '100%' : 400}>
      <Stack direction="row" mb={1}>
        {scopes[ScopeItems.Tasks].create && <TaskAddButton />}
        <Typography
          variant="h5"
          alignSelf="center"
        >
          {t('content:tasks', {length: data.length})}
        </Typography>
      </Stack>
      {!!data.length &&
        <TaskList
          data={data}
          direction="column"
          expandedInProgress={!!data.filter(({state}) => state !== ContentState.Done).length}
        />
      }
    </Box>
  );
};

export default TasksPanel;
