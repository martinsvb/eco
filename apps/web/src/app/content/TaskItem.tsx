import { Avatar, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { ContentFull, ContentState, ContentTypes, getUserInitials } from '@eco/types';
import { useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import ContentDeleteButton from './ContentDeleteButton';
import { AppCard } from '../components/card/AppCard';
import { ContentEditButton } from './ContentEditButton';
import TaskSwitch from './TaskSwitch';

export const TaskItem = ({ id, title, text, state, createdAt, author: { name, picture } }: ContentFull) => {

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

  const userInitials = getUserInitials(name);

  return (
    <AppCard
      actions={
        <>
          {tasks.edit &&
            <>
              <TaskSwitch id={id} state={state as ContentState} />
              <ContentEditButton id={id} type={ContentTypes.Task} />
            </>
          }
          {tasks.delete && <ContentDeleteButton id={id} type={ContentTypes.Task} />}
        </>
      }
      actionsAvailable={tasks.edit || tasks.delete}
      cardTitle={title}
      cardContent={text}
      label={
        <Chip
        avatar={
          <Avatar
            alt={userInitials}
            src={picture || ''}
          >
            {userInitials}
          </Avatar>
        }
        label={dayjs(createdAt).format('DD. MM. YYYY')}
        />
      }
    />
  );
};
