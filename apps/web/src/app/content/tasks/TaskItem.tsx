import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import { ContentFull, ContentState, ContentTypes } from '@eco/types';
import { useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import { AppAvatar, AppCard } from '../../components';
import ContentDeleteButton from '../ContentDeleteButton';
import { ContentEditButton } from '../ContentEditButton';
import TaskSwitch from './TaskSwitch';

export const TaskItem = ({ id, title, text, state, createdAt, author: { name, picture } }: ContentFull) => {

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

  return (
    <AppCard
      actions={
        <>
          {tasks.edit && <TaskSwitch id={id} state={state as ContentState} />}
          <ContentEditButton id={id} isEditable={tasks.edit} type={ContentTypes.Task} />
          {tasks.delete && <ContentDeleteButton id={id} type={ContentTypes.Task} />}
        </>
      }
      actionsAvailable={tasks.read || tasks.edit || tasks.delete}
      cardTitle={title}
      htmlContent={text}
      label={
        <Chip
          avatar={
            <AppAvatar
              name={name}
              picture={picture}
              showTooltip
            />
          }
          label={dayjs(createdAt).format('DD. MM. YYYY')}
        />
      }
    />
  );
};
