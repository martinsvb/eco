import { ReactNode } from 'react';
import { Box, Card, CardActions, CardContent, CardProps, Stack, Typography } from '@mui/material';
import sanitize from 'sanitize-html';
import { useEditorElementsDesign } from '../editor/useEditorDesign';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { useHtml } from '../../hooks/useHtml';

interface AppCardProps extends CardProps {
  actions: ReactNode;
  actionsAvailable?: boolean;
  cardTitle: string;
  label?: ReactNode;
  textContent?: string;
  htmlContent?: any;
  background?: string;
}

export const AppCard = ({
  actions,
  actionsAvailable,
  cardTitle,
  background,
  label,
  textContent,
  htmlContent
}: AppCardProps) => {

  const isMobile = useMobileDetection();

  const { editorElementsDesign } = useEditorElementsDesign();

  const innerHtml = useHtml(htmlContent);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        width: isMobile ? '100%' : 370,
        background,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" component="div" mb={1}>
            {sanitize(cardTitle)}
          </Typography>
          {label}
        </Stack>
        {!!textContent &&
          <Typography
            variant='body1'
            color="text.secondary"
            gutterBottom
          >
            {sanitize(textContent)}
          </Typography>
        }
        {!!htmlContent &&
          <Box
            sx={{
              lineHeight: 1,
              minHeight: 40,
              maxHeight: 40,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ...editorElementsDesign,
            }}
            dangerouslySetInnerHTML={innerHtml}
          />
        }
      </CardContent>
      {!!actionsAvailable &&
        <CardActions
          sx={{
            justifyContent: 'center'
          }}
        >
          {actions}
        </CardActions>
      }
    </Card>
  );
};
