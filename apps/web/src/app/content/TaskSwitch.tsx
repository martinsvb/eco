import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Tooltip } from '@mui/material';
import ms from 'ms';
import { useSnackbar } from 'notistack';
import { apiPatchContent, useAppDispatch } from '@eco/redux';
import { ContentState, ContentTypes } from '@eco/types';

interface TaskSwitchProps {
  id: string;
  state: ContentState;
}

const TaskSwitch = ({id, state}: TaskSwitchProps) => {

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      console.log({checked})
      const body = {state: checked ? ContentState.Done : ContentState.InProgress};
      dispatch(apiPatchContent({
        body,
        id,
        type: ContentTypes.Task,
        onSuccess: () => {
          enqueueSnackbar(
            checked ? t('content:taskSwitchedDone') : t('content:taskSwitchedInProgress'),
            {variant: 'success'}
          );
        }
      }));
    },
    [dispatch, id]
  );

  return (
    <Tooltip
      title={
        state === ContentState.Done
          ? t('content:taskSwitchInProgress')
          : t('content:taskSwitchDone')
      }
      enterDelay={ms('0.1s')}
    >
      <Switch
        checked={state === ContentState.Done}
        onChange={handleChange}
        id="task-switch"
        inputProps={{
          'aria-label': t('content:taskSwitch')
        }}
      />
    </Tooltip>
  );
}

export default TaskSwitch;
