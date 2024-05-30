import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  selectContent,
  selectIsContentsLoading,
  setContentPreview,
  setContentTemp,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentData, ContentItems, ApiOperations, ContentTypes } from '@eco/types';
import { getContentValidationSchema } from '@eco/validation';
import { GridControllerDateTimeField, GridControllerEditor, GridControllerTextField } from '../components';
import { useFormValues, useMobilePortraitDetection } from '../hooks';
import { useContentFormHandlers } from './useContentFormHandlers';
import { gridFieldSettings } from '../helpers/fields';
import ContentFormButtons from './ContentFormButtons';
import TasksPanel from './tasks/TasksPanel';

interface ContentFormProps {
  type: ContentTypes;
  handleDialogClose?: () => void;
}

const ContentForm = ({type, handleDialogClose}: ContentFormProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    (state) => selectIsContentsLoading(state, type, id ? ApiOperations.edit : ApiOperations.create)
  );

  const { data: content, tempData } = useShallowEqualSelector((state) => selectContent(state, type));

  const initData = (tempData || content) as {[key: string]: unknown} | null;

  const values = useFormValues<ContentData>(
    !handleDialogClose ? initData : null,
    [ContentItems.Title, ContentItems.Text, ContentItems.DateTime],
    [ContentItems.DateTime]
  );

  const {
    control,
    formState: { isValid },
    watch
  } = useForm<ContentData>({
    resolver: yupResolver(getContentValidationSchema()),
    mode: 'onTouched',
    values
  });

  const data = watch();

  const { handleClick, handleClose } = useContentFormHandlers(type, data, id, handleDialogClose);

  const handlePreviewClick = useCallback(
    () => {
      if (!id) {
        dispatch(setContentTemp({data, type}));
      }
      dispatch(setContentPreview(true));
    },
    [dispatch, data, id, type]
  );

  return (
    <Stack
      component="form"
    >
      {!handleDialogClose &&
        <Stack
          px={2}
          my={1}
          width={isMobilePortrait ? '100%' : 800}
          direction="row"
          justifyContent="flex-end"
        >
          <Button
            id='content-preview-button'
            startIcon={<VisibilityIcon />}
            onClick={handlePreviewClick}
          >
            {t('labels:preview')}
          </Button>
        </Stack>
      }
      <Stack direction={isMobilePortrait ? 'column' : 'row'} alignItems="baseline">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          width={isMobilePortrait ? '100%' : 800}
          mr={2}
        >
          <GridControllerTextField
            {...gridFieldSettings({md: 6, xs: 12}, control, ContentItems.Title, data)}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:title')
            }}
          />
          <GridControllerDateTimeField
            {...gridFieldSettings({md: 6, xs: 12}, control, ContentItems.DateTime, data)}
            fieldProps={{
              label: t('labels:dateTime')
            }}
          />
          <GridControllerEditor
            {...gridFieldSettings({xs: 12}, control, ContentItems.Text, data)}
            fieldProps={{
              label: t('labels:text'),
              editorDesign: {
                minHeight: !isMobilePortrait && [ContentTypes.Record].includes(type) ? '470px' : '170px',
              }
            }}
          />
          <ContentFormButtons
            isLoading={isLoading}
            isValid={isValid}
            isRoot={!handleDialogClose}
            handleClick={handleClick}
            handleClose={handleClose}
          />
        </Grid>
        {!handleDialogClose && id && <TasksPanel type={type} />}
      </Stack>
    </Stack>
  );
};

export default ContentForm;
