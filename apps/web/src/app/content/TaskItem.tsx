import { useMemo } from 'react';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import { ContentFull, ContentState, ContentTypes } from '@eco/types';
import { useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import ContentDeleteButton from './ContentDeleteButton';
import { AppCard } from '../components/card/AppCard';
import { ContentEditButton } from './ContentEditButton';
import TaskSwitch from './TaskSwitch';
import AppAvatar from '../components/avatar/AppAvatar';
import { serialize } from '../components/editor/serialize/richTextParser';

export const TaskItem = ({ id, title, text, state, createdAt, author: { name, picture } }: ContentFull) => {

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

  const html = useMemo(
    () => {
      if (!text) {
        return undefined;
      }
      return serialize(JSON.parse(text).root.children);
    },
    [text]
  );

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
      htmlContent={html}
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
