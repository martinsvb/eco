import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';
import { selectContentChilds, selectUserAuth, useShallowEqualSelector } from '@eco/redux';
import { ContentState, ContentTypes, ScopeItems } from '@eco/types';
import { useMobilePortraitDetection } from '../../hooks';
import { TaskList } from './TaskList';
import TaskAddButton from './TaskAddButton';

interface TasksPanelProps {
  type: ContentTypes;
}

const TasksPanel = ({type}: TasksPanelProps) => {

  const { t } = useTranslation();

  const isMobilePortrait = useMobilePortraitDetection();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const { childs } = useShallowEqualSelector((state) => selectContentChilds(state, type));

  return (
    <Box width={isMobilePortrait ? '100%' : 400}>
      <Stack direction="row" mb={1}>
        {scopes[ScopeItems.Tasks].create && <TaskAddButton />}
        <Typography
          variant="h5"
          alignSelf="center"
        >
          {t('content:tasks', {length: childs.length})}
        </Typography>
      </Stack>
      {!!childs.length &&
        <TaskList
          data={childs}
          direction="column"
          expandedInProgress={!!childs.filter(({state}) => state !== ContentState.Done).length}
        />
      }
    </Box>
  );
};

export default TasksPanel;
