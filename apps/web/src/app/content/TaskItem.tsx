import { Content } from '@prisma/client';
import { alpha, useTheme } from '@mui/material';
import { ContentState, ContentTypes } from '@eco/types';
import ContentDeleteButton from './ContentDeleteButton';
import { AppCard } from '../components/card/AppCard';
import { ContentEditButton } from './ContentEditButton';
import TaskSwitch from './TaskSwitch';

export const TaskItem = ({id, title, text, state}: Content) => {

  const { palette } = useTheme();

  return (
    <AppCard
      actions={
        <>
          <TaskSwitch id={id} state={state as ContentState} />
          <ContentEditButton id={id} type={ContentTypes.Task} />
          <ContentDeleteButton id={id} type={ContentTypes.Task} />
        </>
      }
      background={alpha(state === ContentState.Done ? palette.success.light : palette.warning.light, .5)}
      cardTitle={title}
      cardContent={text}
    />
  );
};
