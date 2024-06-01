import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import GradingIcon from '@mui/icons-material/Grading';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  apiApproveContent,
  selectContent,
  selectIsContentsLoading,
  selectUserAuth,
  setContentPreview,
  setContentTemp,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentData, ContentItems, ApiOperations, ContentTypes, contentScopes } from '@eco/types';
import { getContentValidationSchema } from '@eco/validation';
import { GridControllerDateTimeField, GridControllerEditor, GridControllerTextField } from '../components';
import { gridFieldSettings } from '../helpers';
import { useFormValues, useMobilePortraitDetection } from '../hooks';
import { useContentFormHandlers } from './useContentFormHandlers';
import ContentFormButtons from './ContentFormButtons';
import TasksPanel from './tasks/TasksPanel';
import { LoadingButton } from '@mui/lab';

interface ContentFormProps {
  type: ContentTypes;
  handleDialogClose?: () => void;
}

const ContentForm = ({type, handleDialogClose}: ContentFormProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const isLoading = useAppSelector(
    (state) => selectIsContentsLoading(state, type, id ? ApiOperations.edit : ApiOperations.create)
  );

  const isApprovalLoading = useAppSelector(
    (state) => selectIsContentsLoading(state, type, ApiOperations.approve)
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

  const handleApprove = useCallback(
    () => {
      if (id) {
        dispatch(
          apiApproveContent({
            approve: !content?.isApproved,
            id,
            type,
          })
        );
      }
    },
    [dispatch, content?.isApproved, id, type]
  );

  const scope = contentScopes[type];

  return (
    <Stack
      component="form"
    >
      {(!handleDialogClose || scopes[scope]?.approve) &&
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
          {scopes[scope]?.approve && content &&
            <LoadingButton
              id="content-approve-button"
              loading={isApprovalLoading}
              startIcon={content.isApproved ? <DoDisturbOnIcon /> : <GradingIcon />}
              onClick={handleApprove}
              color={content.isApproved ? 'warning' : 'success'}
              variant="contained"
              sx={{
                ml: 1
              }}
            >
              {content.isApproved ? t('labels:unapprove') : t('labels:approve')}
            </LoadingButton>
          }
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
        {!handleDialogClose && id && <TasksPanel parentId={id} />}
      </Stack>
    </Stack>
  );
};

export default ContentForm;
