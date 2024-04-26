import { Chip } from '@mui/material';
import { Content } from '@prisma/client';
import dayjs from 'dayjs';
import { ContentState, ContentTypes } from '@eco/types';
import { useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import ContentDeleteButton from './ContentDeleteButton';
import { AppCard } from '../components/card/AppCard';
import { ContentEditButton } from './ContentEditButton';
import TaskSwitch from './TaskSwitch';

export const TaskItem = ({id, title, text, state, createdAt}: Content) => {

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

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
      label={<Chip label={dayjs(createdAt).format('DD. MM. YYYY')} />}
    />
  );
};
